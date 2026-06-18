'use client';

import Hls from 'hls.js';
import { useEffect } from 'react';

import { IS_PRODUCTION } from '@/cores/configs/core-env.config';

const MAX_MEDIA_RECOVER = 20;
const MAX_NETWORK_RELOAD = 1;
const DEAD_STALL_MS = 8000;
const MIN_BUFFER_SEC = 0.25;
const WATCHDOG_INTERVAL_MS = 1000;
const TIMEOUT_VIDEO = 10000;

export default function useStreamHealthCheck(
  videoRef: React.RefObject<HTMLVideoElement>,
  sources: string[] | undefined,
  index: number,
  setIndex: React.Dispatch<React.SetStateAction<number>>,
) {
  useEffect(() => {
    if (!sources?.length) return;
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    let flvPlayer: any | null = null;
    let watchdog: number | null = null;

    const mediaRecoverRef = { current: 0 };
    const networkReloadRef = { current: 0 };
    const lastTimeRef = { current: 0 };
    const stallSinceRef = { current: null as number | null };

    const resetHealth = () => {
      mediaRecoverRef.current = 0;
      networkReloadRef.current = 0;
      stallSinceRef.current = null;
      lastTimeRef.current = video.currentTime || 0;
    };

    const bufferedAhead = () => {
      const t = video.currentTime;
      for (let i = 0; i < video.buffered.length; i++) {
        const start = video.buffered.start(i);
        const end = video.buffered.end(i);
        if (t >= start && t <= end) return end - t;
      }
      return 0;
    };

    const currentSrc = sources[index];
    if (!currentSrc) return;

    (async () => {
      // --- Detect type ---
      if (currentSrc.endsWith('.m3u8')) {
        // HLS
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = currentSrc;
        } else if (Hls.isSupported()) {
          hls = new Hls({
            manifestLoadingTimeOut: TIMEOUT_VIDEO,
            levelLoadingTimeOut: TIMEOUT_VIDEO,
            fragLoadingTimeOut: TIMEOUT_VIDEO,
            manifestLoadingMaxRetry: 0,
            levelLoadingMaxRetry: 0,
            fragLoadingMaxRetry: 0,
          });
          hls.loadSource(currentSrc);
          hls.attachMedia(video);

          hls.on(Hls.Events.ERROR, (_, data) => {
            // !IS_PRODUCTION && console.warn('[HLS error]', data.type, data.details, 'fatal=', data.fatal);
            console.warn('[HLS error]', data.type, data.details, 'fatal=', data.fatal);
            // pushNotiTelegram({
            //   message: `HLS fatal error: ${data.type} / ${data.details}`,
            //   extra: { err: data },
            // });
            if (!data.fatal) return;
            switch (data.type) {
              case Hls.ErrorTypes.MEDIA_ERROR:
                if (mediaRecoverRef.current < MAX_MEDIA_RECOVER) {
                  mediaRecoverRef.current++;
                  hls?.recoverMediaError();
                } else if (index < sources.length - 1) {
                  setIndex(prev => prev + 1);
                }
                break;
              case Hls.ErrorTypes.NETWORK_ERROR:
                if (networkReloadRef.current < MAX_NETWORK_RELOAD) {
                  networkReloadRef.current++;
                  hls?.stopLoad();
                  hls?.startLoad();
                } else if (index < sources.length - 1) {
                  setIndex(prev => prev + 1);
                }
                break;
              default:
                if (index < sources.length - 1) setIndex(prev => prev + 1);
                break;
            }
          });
        }
      } else if (currentSrc.endsWith('.flv')) {
        const flvjs = (await import('flv.js')).default;
        if (flvjs.isSupported()) {
          flvPlayer = flvjs.createPlayer({ type: 'flv', url: currentSrc });
          flvPlayer.attachMediaElement(video);
          flvPlayer.load();
          flvPlayer.play?.();

          flvPlayer.on(flvjs.Events.ERROR, (errType: any, errDetail: any) => {
            !IS_PRODUCTION && console.warn('[FLV error]', errType, errDetail);
            if (index < sources.length - 1) {
              setIndex(prev => prev + 1);
            }
          });
        }
      } else {
        // fallback mp4, webm...
        video.src = currentSrc;
      }
    })();

    // --- Watchdog ---
    watchdog = window.setInterval(() => {
      const nowTime = video.currentTime;
      if (Math.abs(nowTime - lastTimeRef.current) < 0.01) {
        const buf = bufferedAhead();
        if (buf < MIN_BUFFER_SEC) {
          if (stallSinceRef.current == null) stallSinceRef.current = Date.now();
          if (Date.now() - (stallSinceRef.current ?? 0) > DEAD_STALL_MS) {
            if (index < sources.length - 1) {
              setIndex(prev => prev + 1);
            }
          }
        } else {
          try {
            video.currentTime = nowTime + 0.05;
          } catch {}
          stallSinceRef.current = null;
        }
      } else {
        lastTimeRef.current = nowTime;
        stallSinceRef.current = null;
      }
    }, WATCHDOG_INTERVAL_MS);

    // reset health khi có play
    const onPlaying = () => resetHealth();
    const onLoaded = () => resetHealth();
    video.addEventListener('playing', onPlaying);
    video.addEventListener('loadedmetadata', onLoaded);

    return () => {
      if (watchdog) window.clearInterval(watchdog);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('loadedmetadata', onLoaded);
      hls?.destroy();
      flvPlayer?.destroy?.();
    };
  }, [videoRef, sources, index, setIndex]);
}
