'use client';

import Artplayer from 'artplayer';
import flvjs from 'flv.js';
import Hls from 'hls.js';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

import CoreArtPlayerLoading from '@/cores/components/video/art-player/components/core-art-player-loading';
import StatsArtPlayer from '@/cores/components/video/art-player/components/stats-art-player';
import { LS_KEY_DEFAULT } from '@/cores/components/video/art-player/constants/art-player.constant';
import useVideoStats from '@/cores/components/video/art-player/hooks/use-video-stats';
import {
  bindFiniteVideoLoop,
  bindVideoLoadingState,
  waitLoadedMetadata,
} from '@/cores/components/video/art-player/utils/art-player.util';
import { IS_DEBUG } from '@/cores/configs/core-env.config';
import { useIsMounted } from '@/cores/hooks/commons/use-is-mounted.hook';
import { cn } from '@/cores/shadcn/lib/utils';

interface Props {
  source: string | null;
  poster?: string;
  interactedKey?: string;
  showStats?: boolean;
  layout?: 'horizontal' | 'vertical';
  className?: string;
}

const MAX_RETRY_COUNT = 3;
const RETRY_DELAY_MS = 1000;

function detectStreamType(url: string) {
  if (url.includes('.flv')) return 'flv';
  if (url.includes('.m3u8')) return 'm3u8';
  return 'auto';
}

export default function CoreArtPlayerDetail({
  source,
  poster,
  interactedKey = LS_KEY_DEFAULT,
  showStats = false,
  layout = 'horizontal',
  className,
}: Readonly<Props>) {
  const isMounted = useIsMounted();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const artRef = useRef<Artplayer | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [statsVisible, setStatsVisible] = useState(!!showStats);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [allowEmpty, setAllowEmpty] = useState(false);

  const [retryCount, setRetryCount] = useState(0);
  const retryTimeoutRef = useRef<number | null>(null);
  const currentHeight = 100;
  const url = useMemo(() => (source ?? '').trim(), [source]);

  // ? Reset state khi đổi source
  useEffect(() => {
    setError('');
    setIsLoading(true);
    setRetryCount(0);

    if (!url) {
      const t = setTimeout(() => setAllowEmpty(true), 1000);
      return () => clearTimeout(t);
    }
    setAllowEmpty(false);

    return () => {
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch {}
        hlsRef.current = null;
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [url]);

  // ? Cleanup khi đổi loại stream (m3u8 → flv)
  useEffect(() => {
    if (!url) return;
    const newType = detectStreamType(url);
    const oldType = artRef.current ? detectStreamType(artRef.current.url) : null;

    if (oldType && newType !== oldType) {
      IS_DEBUG && console.log('Stream type changed ::: ', oldType, '→', newType);
      artRef.current?.destroy();
      artRef.current = null;
    }
  }, [url]);

  useEffect(() => {
    try {
      if (localStorage.getItem(interactedKey) === 'true') setHasInteracted(true);
    } catch {}
  }, [interactedKey]);

  const attemptPlay = () => {
    if (artRef.current && !artRef.current.playing) {
      try {
        artRef.current.play();
      } catch {}
    }
  };

  const handleRetry = () => {
    if (retryCount >= MAX_RETRY_COUNT) {
      setError('Stream không khả dụng. Thử lại sau.');
      return;
    }

    setRetryCount(prev => prev + 1);
    setError('Đang thử lại...');
    setIsLoading(true);

    const delay = RETRY_DELAY_MS * Math.pow(2, retryCount - 1);
    retryTimeoutRef.current = window.setTimeout(() => {
      attemptPlay();
    }, delay);
  };

  // ? INIT PLAYER (đã fix race condition & cleanup)
  useEffect(() => {
    // ? Chỉ chạy khi đã mounted + đã có container + có url
    if (!isMounted || !containerRef.current || !url) return;

    let cancelled = false;

    const init = async () => {
      // Cleanup cũ
      if (artRef.current) {
        try {
          artRef.current.destroy(false);
        } catch {}
        artRef.current = null;
      }
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch {}
        hlsRef.current = null;
      }
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);

      setError('');
      setIsLoading(true);

      if (cancelled) return;

      const type = detectStreamType(url);
      const art = new Artplayer({
        container: containerRef.current!,
        url,
        type,
        autoplay: hasInteracted,
        muted: !hasInteracted,
        autoSize: true,
        aspectRatio: true,
        // autoSize: false,
        // aspectRatio: false,
        fullscreen: true,
        pip: true,
        airplay: true,
        playbackRate: false,
        hotkey: false,
        miniProgressBar: false,
        lock: false,
        theme: '#f7586b',
        moreVideoAttr: { playsInline: true, controls: false },
        customType: {
          m3u8: (video: HTMLVideoElement, m3u8Url: string) => {
            const markReady = () => setIsLoading(false);
            video.addEventListener('loadedmetadata', markReady, { once: true });
            video.addEventListener('canplay', markReady, { once: true });
            video.addEventListener('playing', markReady);

            if (video.canPlayType('application/vnd.apple.mpegurl')) {
              video.src = m3u8Url;
            } else if (Hls.isSupported()) {
              const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
                backBufferLength: 90,
              });
              hlsRef.current = hls;
              hls.loadSource(m3u8Url);
              hls.attachMedia(video);

              hls.on(Hls.Events.ERROR, (_e, data) => {
                if (data?.fatal) handleRetry();
              });
            } else {
              setError('Trình duyệt không hỗ trợ HLS');
              setIsLoading(false);
            }
          },
          flv: (video: HTMLVideoElement, flvUrl: string) => {
            if (flvjs.isSupported()) {
              const flvPlayer = flvjs.createPlayer({ type: 'flv', url: flvUrl, isLive: true });
              flvPlayer.attachMediaElement(video);
              flvPlayer.load();
              flvPlayer.play();

              flvPlayer.on(flvjs.Events.ERROR, () => {
                setError('Stream FLV lỗi');
                handleRetry();
              });

              art.on('destroy', () => {
                flvPlayer.pause();
                flvPlayer.unload();
                flvPlayer.detachMediaElement();
                flvPlayer.destroy();
              });
            } else {
              setError('Trình duyệt không hỗ trợ FLV');
            }
          },
        },
      });

      artRef.current = art;

      const unbindFiniteVideoLoop = bindFiniteVideoLoop(art.video);
      const video = art.video;
      const unbindVideoLoadingState = bindVideoLoadingState(video, setIsLoading);

      art.on('destroy', () => {
        unbindFiniteVideoLoop();
        unbindVideoLoadingState();

        if (video) {
          try {
            video.pause();
            video.src = '';
            video.load();
          } catch {}
        }
        if (hlsRef.current) {
          try {
            hlsRef.current.destroy();
          } catch {}
          hlsRef.current = null;
        }
      });

      if (IS_DEBUG) {
        (art as any).controls.add({
          name: 'toggle-stats',
          position: 'right',
          html: '📊',
          tooltip: 'Stats',
          click: () => setStatsVisible(v => !v),
        });
      }

      art.on('play', () => {
        setIsLoading(false);
        setRetryCount(0);
        if (!hasInteracted) {
          setHasInteracted(true);
          try {
            localStorage.setItem(interactedKey, 'true');
          } catch {}
        }
      });

      art.on('error', (err: any) => {
        if (cancelled) return;
        setError(err?.message || 'Video lỗi');
        setIsLoading(false);
        handleRetry();
      });
    };

    init();

    return () => {
      cancelled = true;
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
      if (artRef.current) {
        try {
          artRef.current.destroy();
        } catch {}
        artRef.current = null;
      }
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch {}
        hlsRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, hasInteracted, isMounted]);

  // ? Auto unmute khi user đã tương tác
  useEffect(() => {
    const art = artRef.current;
    if (!art || !hasInteracted) return;
    (async () => {
      try {
        await waitLoadedMetadata(art.video);
        art.muted = false;
        await art.play();
      } catch {}
    })();
  }, [hasInteracted]);

  useEffect(() => {
    const onResize = () => {
      try {
        (artRef.current as any)?.resize?.();
      } catch {}
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const stats = useVideoStats(
    () => artRef.current?.video ?? null,
    () => hlsRef.current,
    Hls,
  );

  if (!url) {
    return (
      <div
        className={
          'relative w-full h-[25vh] md:min-h-[calc((100vh-60px)*0.6)] min-h-0 bg-app-background rounded-none lg:rounded overflow-hidden'
        }
      >
        {poster && (
          <Image
            src={poster}
            alt='poster match'
            fill
            sizes='100vw'
            priority
            className='absolute inset-0 object-contain w-full h-full pointer-events-none opacity-70'
          />
        )}
        {allowEmpty && (
          <div className='absolute inset-0 flex items-center justify-center text-black/80 text-sm'>
            ❌ No source available
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-[25vh] md:h-[calc((100vh-60px)*0.6)] min-h-0 bg-app-background rounded-none lg:rounded overflow-hidden`}
    >
      <style jsx global>{`
        /* Ẩn progress bar */
        .art-progress,
        .art-control.art-control-time {
          display: none !important;
          pointer-events: none !important;
        }

        .art-video-player {
          width: 100% !important;
          height: 100% !important;
        }

        .art-video-player .art-loading {
          display: none !important;
        }

        .art-video-player video {
          width: 100% !important;
          height: 100% !important;
          object-fit: ${layout === 'vertical' ? 'cover' : 'contain'} !important;
        }
      `}</style>
      <div ref={containerRef} className={cn('w-full h-full')} />
      {isLoading && !error && (
        <CoreArtPlayerLoading className='pointer-events-none absolute inset-0 z-30 h-full min-h-0 md:h-full' />
      )}
      <StatsArtPlayer stats={stats} visible={statsVisible} error={error} />

      {!!error && (
        <div className='absolute inset-0 flex items-center justify-center text-center'>
          <div className='bg-black/60 backdrop-blur-sm px-4 py-3 rounded-lg'>
            <p className='text-black/90 text-sm'>
              {retryCount > 0 && retryCount < MAX_RETRY_COUNT
                ? `Đang thử lại... (${retryCount}/${MAX_RETRY_COUNT})`
                : error}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
