'use client';

import Artplayer from 'artplayer';
import flvjs from 'flv.js';
import Hls from 'hls.js';
import { useEffect, useMemo, useRef, useState } from 'react';

import { LS_KEY_DEFAULT } from '@/cores/components/video/art-player/constants/art-player.constant';
import {
  bindFiniteVideoLoop,
  bindVideoLoadingState,
  waitLoadedMetadata,
} from '@/cores/components/video/art-player/utils/art-player.util';
import { IS_DEBUG } from '@/cores/configs/core-env.config';
import { useIsMounted } from '@/cores/hooks/commons/use-is-mounted.hook';

const MAX_RETRY_COUNT = 3;
const RETRY_DELAY_MS = 1000;

function detectStreamType(url: string) {
  if (url.includes('.flv')) return 'flv';
  if (url.includes('.m3u8')) return 'm3u8';
  return 'auto';
}

interface UseArtPlayerCoreProps {
  source?: string | null;
  interactedKey?: string;
  loop?: boolean;
  mutedByDefault?: boolean;
  artOptions?: Partial<Artplayer['option']>;
}
// ! Chưa dùng đang test
export function useArtPlayerCore({
  source,
  interactedKey = LS_KEY_DEFAULT,
  loop = true,
  mutedByDefault = true,
  artOptions,
}: UseArtPlayerCoreProps) {
  const isMounted = useIsMounted();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const artRef = useRef<Artplayer | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const retryCountRef = useRef(0);
  const retryTimeoutRef = useRef<number | null>(null);

  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [allowEmpty, setAllowEmpty] = useState(false);

  const url = useMemo(() => (source ?? '').trim(), [source]);

  /* ================= RESTORE INTERACT ================= */
  useEffect(() => {
    try {
      if (localStorage.getItem(interactedKey) === 'true') {
        setHasInteracted(true);
        IS_DEBUG && console.log('[ArtPlayer] restore hasInteracted');
      }
    } catch {}
  }, [interactedKey]);

  /* ================= RESET WHEN SOURCE CHANGES ================= */
  useEffect(() => {
    setError('');
    setIsLoading(true);
    retryCountRef.current = 0;

    if (!url) {
      const t = window.setTimeout(() => setAllowEmpty(true), 1000);
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
        retryTimeoutRef.current = null;
      }
    };
  }, [url]);

  /* ================= RETRY ================= */
  const attemptPlay = () => {
    if (artRef.current && !artRef.current.playing) {
      try {
        artRef.current.play();
      } catch {}
    }
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
    retryTimeoutRef.current = window.setTimeout(attemptPlay, delay);
  };

  /* ================= INIT PLAYER ================= */
  useEffect(() => {
    if (!isMounted || !containerRef.current || !url) return;

    let cancelled = false;

    const init = async () => {
      if (artRef.current) {
        try {
          artRef.current.destroy(false);
        } catch {}
        artRef.current = null;
      }

      setError('');
      setIsLoading(true);

      if (cancelled) return;

      const type = detectStreamType(url);

      const art = new Artplayer({
        container: containerRef.current!,
        url,
        type,
        loop,
        autoplay: hasInteracted,
        muted: mutedByDefault && !hasInteracted,
        volume: 1,
        autoSize: true,
        aspectRatio: false,
        miniProgressBar: false,
        playbackRate: false,
        lock: false,
        theme: '#000',
        moreVideoAttr: {
          playsInline: true,
          preload: 'auto',
          controls: false,
        },
        customType: {
          m3u8: (video, m3u8Url) => {
            const markReady = () => setIsLoading(false);
            video.addEventListener('loadedmetadata', markReady, { once: true });
            video.addEventListener('playing', markReady);

            if (video.canPlayType('application/vnd.apple.mpegurl')) {
              video.src = m3u8Url;
            } else if (Hls.isSupported()) {
              const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
              hlsRef.current = hls;
              hls.loadSource(m3u8Url);
              hls.attachMedia(video);

              hls.on(Hls.Events.ERROR, (_e, data) => {
                if (data?.fatal) handleRetry();
              });
            } else {
              setError('Trình duyệt không hỗ trợ HLS');
            }
          },
          flv: (video, flvUrl) => {
            if (!flvjs.isSupported()) {
              setError('Trình duyệt không hỗ trợ FLV');
              return;
            }

            const flv = flvjs.createPlayer({ type: 'flv', url: flvUrl, isLive: true });
            flv.attachMediaElement(video);
            flv.load();
            flv.play();

            flv.on(flvjs.Events.ERROR, handleRetry);

            art.on('destroy', () => {
              flv.pause();
              flv.unload();
              flv.detachMediaElement();
              flv.destroy();
            });
          },
        },
        ...artOptions,
      });

      artRef.current = art;

      const unbindFiniteVideoLoop = bindFiniteVideoLoop(art.video);
      const video = art.video;
      const unbindVideoLoadingState = bindVideoLoadingState(video, setIsLoading);

      art.on('destroy', () => {
        unbindFiniteVideoLoop();
        unbindVideoLoadingState();
      });

      art.on('play', () => {
        setIsLoading(false);
        retryCountRef.current = 0;

        if (!hasInteracted) {
          setHasInteracted(true);
          try {
            localStorage.setItem(interactedKey, 'true');
          } catch {}
        }
      });

      art.on('error', err => {
        if (cancelled) return;
        IS_DEBUG && console.error('[ArtPlayer error]', err);
        handleRetry();
      });
    };

    init();

    return () => {
      cancelled = true;
      if (artRef.current) {
        try {
          artRef.current.destroy();
        } catch {}
        artRef.current = null;
      }
    };
  }, [url, hasInteracted, isMounted]);

  /* ================= AUTO UNMUTE ================= */
  useEffect(() => {
    const art = artRef.current;
    if (!art || !hasInteracted) return;

    (async () => {
      try {
        await waitLoadedMetadata(art.video);
        art.muted = false;
        art.volume = 1;
        await art.play();
      } catch {}
    })();
  }, [hasInteracted]);

  return {
    containerRef,
    artRef,
    hlsRef,
    isLoading,
    error,
    allowEmpty,
    hasInteracted,
  };
}
