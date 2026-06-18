'use client';

import type { ImageProps } from 'next/image';

import CoreImage from '@/cores/components/images/core-image';
import { cn } from '@/cores/shadcn/lib/utils';
import useI18n from '@/i18n/hooks/use-i18n.hook';

interface Props {
  title?: string;
  className?: string;
  parentClassName?: string;
  image?: ImageProps['src'];
  imageAlt?: string;
  imageClassName?: string;
  imageWidth?: number;
  imageHeight?: number;
  hideTitle?: boolean;
}

export default function CoreEmpty({
  title,
  className,
  parentClassName,
  image,
  imageAlt = '',
  imageClassName,
  imageWidth = 180,
  imageHeight = 120,
  hideTitle = false,
}: Readonly<Props>) {
  const { tGeneral } = useI18n();
  return (
    <div
      className={cn(
        'text-center text-muted-foreground py-2',
        image && 'flex flex-col items-center justify-center gap-4',
        parentClassName,
      )}
    >
      {image && (
        <CoreImage
          type='custom'
          src={image}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className={cn('h-auto w-[160px] md:w-[180px] rounded-lg', imageClassName)}
        />
      )}
      {!hideTitle && (
        <span className={cn('text-gray-500 text-xl md:text-2xl font-semibold', className)}>
          {title ?? tGeneral('empty_data')}
        </span>
      )}
    </div>
  );
}
