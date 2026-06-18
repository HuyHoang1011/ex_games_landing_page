import dynamic from 'next/dynamic';

const CoreArtPlayerShortVideo = dynamic(
  () => import('@/cores/components/video/art-player/components/short-video/core-art-player-short'),
  {
    ssr: false,
    loading: () => null,
  },
);

export default CoreArtPlayerShortVideo;
