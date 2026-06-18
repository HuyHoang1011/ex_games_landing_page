import dynamic from 'next/dynamic';

import CoreArtPlayerLoading from '@/cores/components/video/art-player/components/core-art-player-loading';

const CoreArtPlayerGameVideo = dynamic(
  () => import('@/cores/components/video/art-player/components/core-art-player-game'),
  {
    ssr: false,
    loading: () => <CoreArtPlayerLoading className='h-full min-h-[250px]' />,
  },
);

export default CoreArtPlayerGameVideo;
