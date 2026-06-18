'use client';

import Artplayer from 'artplayer';
import flvjs from 'flv.js';
import Hls, { type ErrorData, type HlsConfig } from 'hls.js';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

import CoreArtPlayerLoading from '@/cores/components/video/art-player/components/core-art-player-loading';
import StatsArtPlayer from '@/cores/components/video/art-player/components/stats-art-player';
import useVideoStats from '@/cores/components/video/art-player/hooks/use-video-stats';
import { bindFiniteVideoLoop, bindVideoLoadingState } from '@/cores/components/video/art-player/utils/art-player.util';
import { IS_DEBUG } from '@/cores/configs/core-env.config';
import { useIsMounted } from '@/cores/hooks/commons/use-is-mounted.hook';

interface Props {
  source: string | null;
  poster?: string;
  interactedKey?: string;
  showStats?: boolean;
  isLive?: boolean;
}

const LS_KEY_DEFAULT = 'hasInteractedWithVideo';
const DEAD_STALL_MS = 12000;
const MIN_BUFFER_SEC = 0.25;
const MAX_RETRY_COUNT = 3;
const RETRY_DELAY_MS = 1000;
const REPLAY_RESUME_BUFFER_SEC = 0.3;
const WATCHDOG_INTERVAL_MS = 1000;

const REPLAY_HLS_CONFIG = {
  backBufferLength: 30,
  maxBufferLength: 30,
  maxMaxBufferLength: 600,
  maxBufferSize: 20 * 1024 * 1024,
  maxBufferHole: 0.5,
  nudgeOffset: 0.1,
  nudgeMaxRetry: 6,
  highBufferWatchdogPeriod: 2,
  detectStallWithCurrentTimeMs: 2000,
  startPosition: -1,
  enableWorker: true,
  lowLatencyMode: false,
  progressive: false,
  startFragPrefetch: true,
  fragLoadPolicy: {
    default: {
      maxTimeToFirstByteMs: 20000,
      maxLoadTimeMs: 120000,
      timeoutRetry: { maxNumRetry: 4, retryDelayMs: 500, maxRetryDelayMs: 4000 },
      errorRetry: { maxNumRetry: 6, retryDelayMs: 1000, maxRetryDelayMs: 8000, backoff: 'linear' },
    },
  },
  manifestLoadPolicy: {
    default: {
      maxTimeToFirstByteMs: 10000,
      maxLoadTimeMs: 20000,
      timeoutRetry: { maxNumRetry: 2, retryDelayMs: 500, maxRetryDelayMs: 2000 },
      errorRetry: { maxNumRetry: 2, retryDelayMs: 1000, maxRetryDelayMs: 4000 },
    },
  },
} satisfies Partial<HlsConfig>;

const LIVE_HLS_CONFIG = {
  enableWorker: true,
  lowLatencyMode: true,
  backBufferLength: 90,
} satisfies Partial<HlsConfig>;

function detectStreamType(url: string) {
  if (url.includes('.flv')) return 'flv';
  if (url.includes('.m3u8')) return 'm3u8';
  return 'auto';
}

function getBufferedAhead(video: HTMLVideoElement) {
  const currentTime = video.currentTime;

  for (let i = 0; i < video.buffered.length; i++) {
    const start = video.buffered.start(i);
    const end = video.buffered.end(i);

    if (currentTime >= start && currentTime <= end) {
      return end - currentTime;
    }
  }

  return 0;
}

export default function CoreArtPlayer({
  source,
  poster,
  interactedKey = LS_KEY_DEFAULT,
  showStats = false,
  isLive = true,
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

  const hasInteractedRef = useRef(false);
  const retryCountRef = useRef(0);
  const retryTimeoutRef = useRef<number | null>(null);
  const shouldResumeReplayRef = useRef(false);

  const url = useMemo(() => (source ?? '').trim(), [source]);

  // ? Reset state khi đổi source
  useEffect(() => {
    setError('');
    setIsLoading(true);
    retryCountRef.current = 0;

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
      if (localStorage.getItem(interactedKey) === 'true') {
        hasInteractedRef.current = true;
        setHasInteracted(true);
      }
    } catch {}
  }, [interactedKey]);

  const attemptPlay = () => {
    if (artRef.current && !artRef.current.playing) {
      try {
        artRef.current.play();
      } catch {}
    }
  };

  const resumeReplayIfBuffered = (video?: HTMLVideoElement | null) => {
    if (isLive || !hasInteractedRef.current || !shouldResumeReplayRef.current) return;

    const currentVideo = video ?? artRef.current?.video ?? null;
    if (!currentVideo || currentVideo.ended) return;

    if (getBufferedAhead(currentVideo) < REPLAY_RESUME_BUFFER_SEC && currentVideo.readyState < 3) {
      return;
    }

    attemptPlay();
  };

  const handleRetry = () => {
    if (retryCountRef.current >= MAX_RETRY_COUNT) {
      setError('Stream không khả dụng. Thử lại sau.');
      return;
    }

    retryCountRef.current++;
    setError('Đang thử lại...');
    setIsLoading(true);

    const delay = RETRY_DELAY_MS * Math.pow(2, retryCountRef.current - 1);
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
      const showTimeline = !isLive;
      const canAutoplay = hasInteractedRef.current;
      const art = new Artplayer({
        container: containerRef.current!,
        url,
        type,
        isLive,
        autoplay: canAutoplay,
        muted: false,
        autoSize: true,
        aspectRatio: true,
        fullscreen: true,
        pip: true,
        airplay: true,
        playbackRate: false,
        hotkey: false,
        miniProgressBar: showTimeline,
        lock: false,
        theme: '#c53940',
        moreVideoAttr: { playsInline: true, controls: false, preload: isLive ? 'metadata' : 'auto' },
        customType: {
          m3u8: (video: HTMLVideoElement, m3u8Url: string) => {
            const markReady = () => setIsLoading(false);
            video.addEventListener('loadedmetadata', markReady, { once: true });
            video.addEventListener('canplay', markReady, { once: true });
            video.addEventListener('playing', markReady);

            if (!isLive) {
              video.preload = 'auto';

              const resumeWhenBuffered = () => resumeReplayIfBuffered(video);
              const markReplayIntent = () => {
                shouldResumeReplayRef.current = true;
              };

              video.addEventListener('play', markReplayIntent);
              video.addEventListener('canplay', resumeWhenBuffered);
              video.addEventListener('progress', resumeWhenBuffered);
              video.addEventListener('seeking', markReplayIntent);
              video.addEventListener('waiting', () => {
                shouldResumeReplayRef.current = true;
              });

              art.on('destroy', () => {
                video.removeEventListener('play', markReplayIntent);
                video.removeEventListener('canplay', resumeWhenBuffered);
                video.removeEventListener('progress', resumeWhenBuffered);
                video.removeEventListener('seeking', markReplayIntent);
              });
            }

            if (video.canPlayType('application/vnd.apple.mpegurl') && isLive) {
              video.src = m3u8Url;
              if (!isLive) {
                video.load();
              }
            } else if (Hls.isSupported()) {
              const hls = new Hls(isLive ? LIVE_HLS_CONFIG : REPLAY_HLS_CONFIG);
              // console.log('🚀 ~ init ~ hls:', hls.config);
              hlsRef.current = hls;

              let recoverDecodeTries = 0;

              hls.loadSource(m3u8Url);
              hls.attachMedia(video);

              hls.on(Hls.Events.ERROR, (_e, data: ErrorData) => {
                if (!data) return;

                if (!data.fatal) {
                  if (IS_DEBUG && !isLive) {
                    console.warn('[HLS WARN]', data.type, data.details);
                  }
                  return;
                }

                if (isLive) {
                  handleRetry();
                  return;
                }

                switch (data.type) {
                  case Hls.ErrorTypes.MEDIA_ERROR:
                    if (recoverDecodeTries < 3) {
                      recoverDecodeTries++;
                      hls.recoverMediaError();
                    } else {
                      handleRetry();
                    }
                    break;
                  case Hls.ErrorTypes.NETWORK_ERROR:
                    hls.startLoad(-1);
                    handleRetry();
                    break;
                  default:
                    handleRetry();
                    break;
                }
              });

              hls.on(Hls.Events.MANIFEST_PARSED, () => {
                recoverDecodeTries = 0;
                video.muted = false;
                if (!isLive && hasInteractedRef.current) {
                  shouldResumeReplayRef.current = true;
                }
                resumeReplayIfBuffered(video);
              });

              hls.on(Hls.Events.FRAG_BUFFERED, () => {
                resumeReplayIfBuffered(video);
              });
            } else {
              setError('Trình duyệt không hỗ trợ HLS');
              setIsLoading(false);
            }
          },
          flv: (video: HTMLVideoElement, flvUrl: string) => {
            if (flvjs.isSupported()) {
              const flvPlayer = flvjs.createPlayer({ type: 'flv', url: flvUrl, isLive });
              flvPlayer.attachMediaElement(video);
              flvPlayer.load();
              video.muted = false;
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
        shouldResumeReplayRef.current = true;
        setIsLoading(false);
        retryCountRef.current = 0;
        if (!hasInteractedRef.current) {
          hasInteractedRef.current = true;
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

      art.on('pause', () => {
        const video = art.video;
        if (!video) return;

        shouldResumeReplayRef.current = isLive ? false : !video.ended && !video.seeking;
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
  }, [url, isMounted, isLive]);

  // ? Auto unmute khi user đã tương tác
  // useEffect(() => {
  //   const art = artRef.current;
  //   if (!art || !hasInteracted) return;
  //   (async () => {
  //     try {
  //       await waitLoadedMetadata(art.video);
  //       art.muted = false;
  //       await art.play();
  //     } catch {}
  //   })();
  // }, [hasInteracted]);

  useEffect(() => {
    if (isLive || !url || !hasInteracted || !artRef.current) return;

    const video = artRef.current.video;
    if (!video) return;

    let watchdog: number | null = null;
    let stallSince: number | null = null;
    let lastTime = video.currentTime || 0;

    watchdog = window.setInterval(() => {
      const now = video.currentTime;
      const bufferedAhead = getBufferedAhead(video);
      const isWaitingForData = !video.ended && !video.seeking && !video.paused;

      if (Math.abs(now - lastTime) < 0.01) {
        if (bufferedAhead < MIN_BUFFER_SEC) {
          if (stallSince == null) stallSince = Date.now();
          if (Date.now() - stallSince > DEAD_STALL_MS) {
            handleRetry();
          }
          return;
        }

        if (isWaitingForData && video.readyState >= 2) {
          try {
            video.currentTime = now + Math.min(0.05, bufferedAhead / 2);
          } catch {}

          resumeReplayIfBuffered(video);
        }
      } else {
        lastTime = now;
      }

      stallSince = null;
    }, WATCHDOG_INTERVAL_MS);

    return () => {
      if (watchdog) clearInterval(watchdog);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasInteracted, isLive, url]);

  const stats = useVideoStats(
    () => artRef.current?.video ?? null,
    () => hlsRef.current,
    Hls,
  );

  if (!url) {
    return (
      <div className='relative w-full min-h-[200px] md:min-h-[400px] bg-app-background rounded-none md:rounded overflow-hidden'>
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
          <div className='absolute inset-0 flex items-center justify-center text-white/80 text-sm'>
            ❌ No source available
          </div>
        )}
      </div>
    );
  }

  // if (!isMounted) return null;

  return (
    <div className='relative w-full min-h-[200px] md:min-h-[400px] bg-app-background rounded-none md:rounded overflow-hidden'>
      <div ref={containerRef} className={`w-full aspect-video ${isLive ? 'art-player-live' : 'art-player-replay'}`} />

      {isLoading && !error && (
        <CoreArtPlayerLoading className='pointer-events-none absolute inset-0 z-30 h-full min-h-0 md:h-full' />
      )}

      <StatsArtPlayer stats={stats} visible={statsVisible} error={error} />

      {!!error && (
        <div className='absolute inset-0 flex items-center justify-center text-center'>
          <div className='bg-black/60 backdrop-blur-sm px-4 py-3 rounded-lg'>
            <p className='text-white/90 text-sm'>
              {retryCountRef.current > 0 && retryCountRef.current < MAX_RETRY_COUNT
                ? `Đang thử lại... (${retryCountRef.current}/${MAX_RETRY_COUNT})`
                : error}
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        .art-video-player .art-loading,
        .art-player-live .art-loading,
        .art-player-replay .art-loading {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
