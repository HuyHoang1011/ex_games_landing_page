'use client';
import { type ImageProps } from 'next/image';

import CoreGapY from '@/cores/components/commons/core-gap-y';
import CoreImage from '@/cores/components/images/core-image';
import { useIsMobile } from '@/cores/shadcn/lib/hooks/use-mobile';
import { cn } from '@/cores/shadcn/lib/utils';
import { getImageUrl } from '@/cores/utils/core-image.util';

interface Props {
  title: string;
  iconImageUrl?: Pick<ImageProps, 'src'>['src'];
  description?: string;
  isHaveWings?: boolean;
  className?: string;
}

export default function CoreHeadingWings({
  title,
  iconImageUrl,
  description,
  isHaveWings = true,
  className,
}: Readonly<Props>) {
  const isMobile = useIsMobile();

  return (
    <div className='flex flex-col items-center'>
      <div>
        {/* Title container */}
        <div className='z-10 flex items-center justify-center gap-2'>
          {iconImageUrl && <CoreImage src={iconImageUrl} alt={title} parentClassName='h-8' />}
          <div className='relative flex items-center justify-center'>
            {isHaveWings && <WingImage side='left' isMobile={isMobile} />}
            <h3
              className={cn(
                'text-primary font-normal font-helvetins text-center uppercase',
                isMobile ? 'text-[20px] mx-3' : 'text-[28px] md:text-[40px]',
                className,
              )}
            >
              {title}
            </h3>
            {isHaveWings && <WingImage side='right' isMobile={isMobile} />}
          </div>
        </div>
      </div>

      {description && (
        <p className='text-center text-white font-medium text-base mt-2 max-w-[800px] mx-auto'>{description}</p>
      )}
      <CoreGapY />
    </div>
  );
}

function WingImage({ side, isMobile }: Readonly<{ side: 'left' | 'right'; isMobile: boolean }>) {
  // const imageUrl =
  //   side === 'left'
  //     ? '/uploads/media/1762091431262381294_wing-left.webp'
  //     : '/uploads/media/1762091438911235690_wing-right.webp';
  const imageUrl =
    side === 'left' ? '/uploads/media/1771940012288554783_left.webp' : '/uploads/media/1771940033965912683_right.webp';
  return (
    <div
      className={cn(
        'absolute z-10 top-1/2 -translate-y-1/2',
        isMobile
          ? 'flex items-center bottom-[6px] w-[100px] h-[10px]'
          : 'hidden md:block h-[38px] w-[363px] absolute-vertical-center',
        side === 'left' && (isMobile ? '-left-24' : '-left-[420px]'),
        side === 'right' && (isMobile ? '-right-24' : '-right-[420px]'),
      )}
    >
      <CoreImage
        src={getImageUrl(imageUrl, 'cdn-abc1tv')}
        alt={`wing-${side}`}
        type='custom'
        fill
        // sizes='100px'
        className='object-contain'
      />
    </div>
  );
}
