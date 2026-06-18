'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

import CoreToolbarVideo from '@/cores/components/video/core-toolbar-video';
import { IS_PRODUCTION } from '@/cores/configs/core-env.config';
import useStreamHealthCheck from '@/cores/hooks/commons/use-stream-health-check';
import { cn } from '@/cores/shadcn/lib/utils';
import useI18n from '@/i18n/hooks/use-i18n.hook';

interface Props {
  sources?: string[];
  autoUnmute?: boolean;
}

const TIMEOUT_BUMP_TOOLBAR = 5000;

export function CoreHlsVideo({ sources = [], autoUnmute = false }: Readonly<Props>) {
  const { tGeneral } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<any>(null);

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // ? đọc cờ allowSound (set ở Home khi user đã click)
  const allowSound = typeof window !== 'undefined' && localStorage.getItem('allowSound') === '1';

  // ? nếu autoUnmute = true và có allowSound thì không muted
  // const [isMuted, setIsMuted] = useState(!(autoUnmute && allowSound));
  const [isMuted, setIsMuted] = useState(!autoUnmute);
  const [volume, setVolume] = useState(1);
  // const [volume, setVolume] = useState(allowSound ? 1 : 0);

  // ? Native Fullscreen
  const [isFs, setIsFs] = useState(false);

  // ? Toolbar show/hide
  const [showControls, setShowControls] = useState(true);
  const hideTimerRef = useRef<number | null>(null);

  useStreamHealthCheck(videoRef, sources, index, setIndex);

  const bumpToolbar = useCallback(() => {
    setShowControls(true);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => setShowControls(false), TIMEOUT_BUMP_TOOLBAR);
  }, []);

  useEffect(() => {
    bumpToolbar();
    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, [bumpToolbar]);

  // ? Home: lần đầu click unmute thành công -> set allowSound
  useEffect(() => {
    if (!autoUnmute) {
      const controller = new AbortController();
      const { signal } = controller;

      const tryUnmuteAndPlay = (e: Event) => {
        const video = videoRef.current;
        if (!video) return;

        // ? Bỏ qua nếu click vào button/control
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('[role="button"]')) {
          return;
        }

        video.muted = false;
        if (video.volume === 0) video.volume = 1;

        video
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
            setVolume(video.volume);
            localStorage.setItem('allowSound', '1'); // 👈 lưu flag
          })
          .catch((err: Error) => {
            !IS_PRODUCTION && console.warn('Play with sound blocked:', err);
          });

        controller.abort();
      };

      document.addEventListener('click', tryUnmuteAndPlay, { signal });
      document.addEventListener('touchstart', tryUnmuteAndPlay, { signal, passive: true });

      return () => controller.abort();
    }
  }, [autoUnmute]);

  // ? Controls actions
  const handlePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch((err: Error) => !IS_PRODUCTION && console.warn('Play error:', err));
    } else {
      video.pause();
      setIsPlaying(false);
    }
    bumpToolbar();
  }, [bumpToolbar]);

  const handleMuteToggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    if (!video.muted && video.volume === 0) {
      video.volume = 1;
      setVolume(1);
    }
    setIsMuted(video.muted);
    bumpToolbar();
  }, [bumpToolbar]);

  const handleVolumeChange = useCallback(
    (vol: number) => {
      const video = videoRef.current;
      if (!video) return;
      const clamped = Math.min(1, Math.max(0, vol));
      video.volume = clamped;
      setVolume(clamped);
      if (clamped === 0 && !video.muted) {
        video.muted = true;
        setIsMuted(true);
      } else if (clamped > 0 && video.muted) {
        video.muted = false;
        setIsMuted(false);
      }
      bumpToolbar();
    },
    [bumpToolbar],
  );

  // ? Native Fullscreen enter/exit
  const enterNativeFs = useCallback(() => {
    const container = containerRef.current as any;
    if (!container) return;
    (
      container.requestFullscreen?.() ||
      container.webkitRequestFullscreen?.() ||
      container.msRequestFullscreen?.()
    )?.catch?.(() => {});
    bumpToolbar();
  }, [bumpToolbar]);

  const exitNativeFs = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      bumpToolbar();
    }
  }, [bumpToolbar]);

  useEffect(() => {
    const onFsChange = () => {
      const active = !!document.fullscreenElement;
      setIsFs(active);
      bumpToolbar(); // ? khi vào/thoát FS cũng hiện lại & reset timer
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, [bumpToolbar]);

  // ? PIP
  const togglePiP = useCallback(async () => {
    const video = videoRef.current as any;
    if (!video) return;
    try {
      if (document.pictureInPictureElement) {
        await (document as any).exitPictureInPicture?.();
      } else if (document.pictureInPictureEnabled && !video.disablePictureInPicture) {
        await video.requestPictureInPicture();
      }
    } catch (e) {
      !IS_PRODUCTION && console.warn('PiP error:', e);
    } finally {
      bumpToolbar();
    }
  }, [bumpToolbar]);

  // Sync UI với sự kiện video
  const onPlay = () => {
    setIsPlaying(true);
    bumpToolbar();
  };
  const onPause = () => {
    setIsPlaying(false);
    bumpToolbar();
  };
  const onVolumeEvt = () => {
    const v = videoRef.current;
    if (!v) return;
    setIsMuted(v.muted || v.volume === 0);
    setVolume(v.volume);
    bumpToolbar();
  };

  if (!sources || sources.length === 0) {
    return (
      <div className='w-full min-h-[200px] md:min-h-[400px] bg-app-background flex items-center justify-center text-white rounded'>
        ❌ {tGeneral('empty_stream')}
      </div>
    );
  }

  const cursorClass = isFs ? (showControls ? 'cursor-default' : 'cursor-none') : 'cursor-default';

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full min-h-[200px] md:min-h-[400px] bg-app-background rounded overflow-hidden group',
        cursorClass,
      )}
      onMouseMove={bumpToolbar}
      onTouchStart={bumpToolbar}
      onClick={bumpToolbar}
      onKeyDown={bumpToolbar}
      tabIndex={-1}
    >
      <video
        ref={videoRef}
        className='size-full'
        autoPlay
        muted={isMuted}
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onVolumeChange={() => {
          const v = videoRef.current;
          if (!v) return;
          setIsMuted(v.muted || v.volume === 0);
          setVolume(v.volume);
          bumpToolbar();
        }}
        onClick={bumpToolbar}
        onTouchStart={bumpToolbar}
      />

      <CoreToolbarVideo
        isPlaying={isPlaying}
        isMuted={isMuted}
        volume={volume}
        isFs={isFs}
        show={showControls}
        onPlayPause={handlePlayPause}
        onMuteToggle={handleMuteToggle}
        onVolumeChange={handleVolumeChange}
        onEnterNativeFs={enterNativeFs}
        onExitNativeFs={exitNativeFs}
        onTogglePiP={togglePiP}
      />
    </div>
  );
}
