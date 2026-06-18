import type Hls from 'hls.js';
import { useCallback, useEffect, useRef, useState } from 'react';

const MAX_SAMPLES = 6;

export default function useVideoStats(
  getVideo: () => HTMLVideoElement | null,
  getHls: () => Hls | null,
  hlsInstance: typeof Hls,
) {
  const [fps, setFps] = useState(0);
  const [dropped, setDropped] = useState(0);
  const [total, setTotal] = useState(0);
  const [latencyMs, setLatencyMs] = useState(0);
  const [throughputMbps, setThroughputMbps] = useState(0);
  const [bufferSec, setBufferSec] = useState(0);
  const [resolution, setResolution] = useState('-');
  const [level, setLevel] = useState(-1);
  const [lag, setLag] = useState(false);

  const prevTotalRef = useRef(0);
  const samplesRef = useRef<{ latency: number; bwMbps: number }[]>([]);

  const bufferedAhead = useCallback((video: HTMLVideoElement) => {
    const t = video.currentTime;
    for (let i = 0; i < video.buffered.length; i++) {
      const s = video.buffered.start(i);
      const e = video.buffered.end(i);
      if (t >= s && t <= e) return e - t;
    }
    return 0;
  }, []);

  // ? FPS, dropped frames, buffer, lag heuristic
  useEffect(() => {
    const iv = window.setInterval(() => {
      const v = getVideo();
      if (!v) return;

      const q = (v as any).getVideoPlaybackQuality?.();
      let totalFrames = 0;
      let droppedFrames = 0;
      if (q) {
        totalFrames = q.totalVideoFrames ?? 0;
        droppedFrames = q.droppedVideoFrames ?? 0;
      } else {
        totalFrames = (v as any).webkitDecodedFrameCount ?? 0;
        droppedFrames = (v as any).webkitDroppedFrameCount ?? 0;
      }

      const prev = prevTotalRef.current;
      const fpsNow = Math.max(0, totalFrames - prev);
      prevTotalRef.current = totalFrames;

      setFps(fpsNow);
      setDropped(droppedFrames);
      setTotal(totalFrames);

      const buf = bufferedAhead(v);
      setBufferSec(buf);

      const maybeLag = buf < 0.25 || (fpsNow <= 10 && !v.paused);
      setLag(maybeLag);
    }, 1000);

    return () => window.clearInterval(iv);
  }, [bufferedAhead, getVideo]);

  // ? Hls.js fragment latency/throughput & level info
  useEffect(() => {
    const hls = getHls();
    const v = getVideo();
    if (!hls || !v) return;

    const onFragLoaded = (_evt: any, data: any) => {
      const st = data?.stats;
      if (!st) return;
      const latency = Math.max(0, (st.tfirst ?? 0) - (st.trequest ?? 0)); // ms
      const download = Math.max(1, (st.tload ?? 0) - (st.tfirst ?? 0)); // ms
      const bytes = st.loaded ?? 0;
      const bwMbps = (bytes * 8) / (download / 1000) / 1_000_000; // Mb/s

      const arr = samplesRef.current;
      arr.push({ latency, bwMbps });
      if (arr.length > MAX_SAMPLES) arr.shift();

      const avgLatency = arr.reduce((a, b) => a + b.latency, 0) / arr.length;
      const avgBw = arr.reduce((a, b) => a + b.bwMbps, 0) / arr.length;

      setLatencyMs(Math.round(avgLatency));
      setThroughputMbps(Number(avgBw.toFixed(2)));
    };

    const onLevelSwitched = (_evt: any, data: any) => {
      const lv = data?.level ?? -1;
      setLevel(lv);
      try {
        const lvInfo = hls.levels?.[lv];
        if (lvInfo) {
          const h = lvInfo.height ?? 0;
          const r = lvInfo.bitrate ? Math.round(lvInfo.bitrate / 1000) : undefined;
          setResolution(r ? `${h}p @ ${r}kbps` : `${h}p`);
        } else {
          setResolution('-');
        }
      } catch {
        setResolution('-');
      }
    };

    hls.on(hlsInstance.Events.FRAG_LOADED, onFragLoaded);
    hls.on(hlsInstance.Events.LEVEL_SWITCHED, onLevelSwitched);

    return () => {
      hls.off(hlsInstance.Events.FRAG_LOADED, onFragLoaded);
      hls.off(hlsInstance.Events.LEVEL_SWITCHED, onLevelSwitched);
    };
  }, [getHls, getVideo, hlsInstance]);

  return { fps, dropped, total, latencyMs, throughputMbps, bufferSec, resolution, level, lag };
}
