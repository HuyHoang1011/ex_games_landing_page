import dynamic from 'next/dynamic';

import CoreArtPlayerLoading from '@/cores/components/video/art-player/components/core-art-player-loading';

const CoreArtPlayerDetailVideo = dynamic(
  () => import('@/cores/components/video/art-player/components/core-art-player-detail'),
  {
    ssr: false,
    loading: () => <CoreArtPlayerLoading className='h-50 w-full rounded-lg md:h-50' />,
  },
);

export default CoreArtPlayerDetailVideo;
