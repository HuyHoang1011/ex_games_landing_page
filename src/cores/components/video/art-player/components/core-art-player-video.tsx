import dynamic from 'next/dynamic';

import CoreArtPlayerLoading from '@/cores/components/video/art-player/components/core-art-player-loading';

const CoreArtPlayerVideo = dynamic(() => import('@/cores/components/video/art-player/components/core-art-player'), {
  ssr: false,
  loading: () => <CoreArtPlayerLoading />,
});

export default CoreArtPlayerVideo;
