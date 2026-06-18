'use client';

import Artplayer from 'artplayer';
import flvjs from 'flv.js';
import Hls from 'hls.js';
import Image from 'next/image';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import CoreArtPlayerLoading from '@/cores/components/video/art-player/components/core-art-player-loading';
import { LS_KEY_DEFAULT } from '@/cores/components/video/art-player/constants/art-player.constant';
import {
  bindVideoLoadingState,
  replayFiniteVideo,
  waitLoadedMetadata,
} from '@/cores/components/video/art-player/utils/art-player.util';
import { IS_DEBUG } from '@/cores/configs/core-env.config';
import { useIsMounted } from '@/cores/hooks/commons/use-is-mounted.hook';
import { cn } from '@/cores/shadcn/lib/utils';

interface Props {
  source?: string | null;
  poster?: string;
  isShowBackground?: boolean;
  bg?: string;
  isFakePlayButton?: boolean;
  onPlayingChange?: (isPlaying: boolean) => void;
  onReadyChange?: (isReady: boolean) => void;
  loadingClassName?: string;
}

export interface CoreArtPlayerShortRef {
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
  getInstance: () => Artplayer | null;
}

function detectStreamType(url: string) {
  if (url.includes('.flv')) return 'flv';
  if (url.includes('.m3u8')) return 'm3u8';
  return 'auto';
}

const CoreArtPlayerShort = forwardRef<CoreArtPlayerShortRef, Props>(function CoreArtPlayerShort(
  { source, poster, isShowBackground = false, bg: _bg, onPlayingChange, onReadyChange, loadingClassName },
  ref,
) {
  const isMounted = useIsMounted();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const artRef = useRef<Artplayer | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [_isVideoReady, setIsVideoReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [, setHasInteracted] = useState(false);
  const [, setError] = useState('');

  // ! Dùng ref để tránh stale closure trong các handler
  const isPlayingRef = useRef(false);
  const hasInteractedRef = useRef(false);

  const url = useMemo(() => (source ?? '').trim(), [source]);

  /* ================= EXPOSE REF ================= */
  const playVideo = async () => {
    const art = artRef.current;
    if (!art?.video) return;

    try {
      // Dùng video element trực tiếp, ổn định hơn art.play()
      await art.video.play();

      if (!hasInteractedRef.current) {
        hasInteractedRef.current = true;
        setHasInteracted(true);
        try {
          localStorage.setItem(LS_KEY_DEFAULT, 'true');
        } catch {}
      }

      try {
        await waitLoadedMetadata(art.video);
        art.video.muted = false;
        art.video.volume = 1;
      } catch {}
    } catch (err) {
      IS_DEBUG && console.error('[ShortVideo play error]', err);
    }
  };

  const pauseVideo = () => {
    const art = artRef.current;
    if (!art?.video) return;
    try {
      art.video.pause();
    } catch {}
  };

  useImperativeHandle(
    ref,
    () => ({
      play: playVideo,
      pause: pauseVideo,
      toggle: () => {
        // ! Dùng ref state, KHÔNG dùng art.playing (không reliable sau nhiều lần toggle)
        if (isPlayingRef.current) {
          pauseVideo();
        } else {
          void playVideo();
        }
      },
      getInstance: () => artRef.current,
    }),
    [],
  );

  /* ================= RESTORE INTERACT ================= */
  useEffect(() => {
    try {
      if (localStorage.getItem(LS_KEY_DEFAULT) === 'true') {
        hasInteractedRef.current = true;
        setHasInteracted(true);
        IS_DEBUG && console.log('[ShortVideo] restore hasInteracted');
      }
    } catch {}
  }, []);

  /* ================= RESET WHEN SOURCE CHANGES ================= */
  useEffect(() => {
    setError('');
    setIsLoading(true);
    setIsVideoReady(false);
    isPlayingRef.current = false;

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
  }, [url]);

  /* ================= INIT PLAYER ================= */
  useEffect(() => {
    if (!isMounted || !containerRef.current || !url) return;

    const type = detectStreamType(url);
    const canAutoplay = hasInteractedRef.current;

    const art = new Artplayer({
      container: containerRef.current,
      url,
      type,
      loop: true,
      autoplay: canAutoplay,
      muted: !canAutoplay,
      volume: 1,
      autoSize: true,
      aspectRatio: false,
      fullscreen: false,
      pip: false,
      airplay: false,
      hotkey: false,
      playbackRate: false,
      miniProgressBar: false,
      lock: false,
      theme: '#000',
      moreVideoAttr: {
        playsInline: true,
        preload: 'auto',
        controls: false,
      },
      customType: {
        m3u8: (video, m3u8Url) => {
          if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = m3u8Url;
          } else if (Hls.isSupported()) {
            const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
            hlsRef.current = hls;
            hls.loadSource(m3u8Url);
            hls.attachMedia(video);

            hls.on(Hls.Events.ERROR, (_, data) => {
              if (data?.fatal) setError('HLS stream error');
            });
          } else {
            setError('Browser does not support HLS');
          }
        },
        flv: (video, flvUrl) => {
          if (!flvjs.isSupported()) {
            setError('Browser does not support FLV');
            return;
          }
          const flv = flvjs.createPlayer({ type: 'flv', url: flvUrl, isLive: true });
          flv.attachMediaElement(video);
          flv.load();
          flv.play();
          art.on('destroy', () => {
            flv.pause();
            flv.unload();
            flv.detachMediaElement();
            flv.destroy();
          });
        },
      },
    });

    artRef.current = art;

    /* ================= EVENTS ================= */
    // ! Lắng nghe trực tiếp video element để chắc chắn sync
    const video = art.video;

    const tryAutoplay = async () => {
      if (!canAutoplay || !video || !video.paused) return;

      try {
        await video.play();
      } catch (err) {
        IS_DEBUG && console.warn('[ShortVideo autoplay blocked]', err);

        try {
          video.muted = true;
          await video.play();
        } catch (fallbackErr) {
          IS_DEBUG && console.warn('[ShortVideo muted autoplay blocked]', fallbackErr);
        }
      }
    };

    const handlePlay = () => {
      isPlayingRef.current = true;
      setIsLoading(false);
      setIsVideoReady(true);
      onPlayingChange?.(true);
      onReadyChange?.(true);

      if (!hasInteractedRef.current) {
        hasInteractedRef.current = true;
        setHasInteracted(true);
        try {
          localStorage.setItem(LS_KEY_DEFAULT, 'true');
        } catch {}
      }
    };

    const handlePause = () => {
      isPlayingRef.current = false;
      onPlayingChange?.(false);
    };

    const markVideoReady = () => {
      setIsLoading(false);
      setIsVideoReady(true);
      onReadyChange?.(true);
    };
    const unbindVideoLoadingState = bindVideoLoadingState(video, setIsLoading);

    const handleEnded = () => {
      if (replayFiniteVideo(video)) return;

      isPlayingRef.current = false;
      onPlayingChange?.(false);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('playing', handlePlay);
    video.addEventListener('loadeddata', markVideoReady);
    video.addEventListener('canplay', markVideoReady);
    video.addEventListener('loadedmetadata', tryAutoplay, { once: true });
    video.addEventListener('canplay', tryAutoplay, { once: true });
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    requestAnimationFrame(() => {
      void tryAutoplay();
    });

    art.on('error', err => {
      IS_DEBUG && console.error('[ShortVideo error]', err);
      setError('Video error');
    });

    return () => {
      try {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('playing', handlePlay);
        unbindVideoLoadingState();
        video.removeEventListener('loadeddata', markVideoReady);
        video.removeEventListener('canplay', markVideoReady);
        video.removeEventListener('loadedmetadata', tryAutoplay);
        video.removeEventListener('canplay', tryAutoplay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('ended', handleEnded);
      } catch {}
      try {
        art.destroy();
      } catch {}
      artRef.current = null;
      isPlayingRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, isMounted]);
  // ! Bỏ hasInteracted khỏi deps để tránh re-init player gây bug toggle

  if (!url) {
    return (
      <div className='absolute inset-0 bg-black'>
        {poster && <Image src={poster} alt='poster' fill priority className='object-cover opacity-60' />}
      </div>
    );
  }

  return (
    <div className='absolute inset-0 bg-black overflow-hidden'>
      {/* //? old css show background
        .art-video-player {
          background-image: ${isShowBackground && isVideoReady
            ? `url('${bg ?? '/assets/images/background/bg-art-player.webp'}')`
            : 'none'};
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        } */}
      <style jsx global>{`
        /* Ẩn progress bar */
        .art-progress,
        .art-control.art-control-time {
          display: none !important;
          pointer-events: none !important;
        }

        .art-video-player,
        .art-video-player video {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
          object-position: top center !important;
          z-index: 0 !important;
        }
        .art-controls {
          display: none !important;
        }
        .art-video-player .art-loading {
          display: none !important;
        }
        .art-state,
        .art-icon-state,
        .art-mask,
        .art-video-player .art-state,
        .art-video-player .art-icon-state,
        .art-video-player .art-mask {
          display: none !important;
        }
      `}</style>

      <div ref={containerRef} className={`w-full h-full ${isShowBackground ? 'art-bg-visible' : ''}`} />
      {isLoading && (
        <CoreArtPlayerLoading
          className={cn(loadingClassName ?? 'pointer-events-none absolute inset-0 z-30 size-full')}
        />
      )}
    </div>
  );
});

export default CoreArtPlayerShort;
