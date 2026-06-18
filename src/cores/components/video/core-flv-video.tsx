import flvjs from 'flv.js';
import { useEffect, useRef } from 'react';

// ? Test FLV
export default function FlvPlayer({ url }: { url: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (flvjs.isSupported() && videoRef.current) {
      const flvPlayer = flvjs.createPlayer({ type: 'flv', url });
      flvPlayer.attachMediaElement(videoRef.current);
      flvPlayer.load();
      flvPlayer.play();
      return () => flvPlayer.destroy();
    }
  }, [url]);

  return <video ref={videoRef} controls autoPlay muted />;
}
