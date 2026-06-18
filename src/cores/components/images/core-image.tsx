'use client';

import Image, { type ImageProps } from 'next/image';
import { type ReactNode, useState, type HTMLAttributes } from 'react';

import { cn } from '@/cores/shadcn/lib/utils';
import { getImageUrl } from '@/cores/utils/core-image.util';

interface Props extends ImageProps {
  type?: 'default' | 'avatar' | 'icon' | 'custom';
  parentClassName?: HTMLAttributes<HTMLDivElement>['className'];
  objectFit?: 'object-cover' | 'object-contain';
  isHaveOverlay?: boolean;
  isLCP?: boolean;
  extraRender?: ReactNode;
}

export default function CoreImage({
  type = 'default',
  parentClassName = 'size-20',
  objectFit = 'object-cover',
  isHaveOverlay = false,
  isLCP,
  extraRender,
  ...rest
}: Readonly<Props>) {
  const { alt, src, className, ...otherRest } = rest;
  const [hasError, setHasError] = useState(false);
  // ? fallback image khi có lỗi
  const imageSrc = hasError ? getImageUrl('/assets/images/default.webp', 'default') : src;
  // IS_DEBUG && console.log('CoreImage ::: imageSrc ::: ', imageSrc);
  const handleError = () => {
    setHasError(true);
  };

  if (type === 'custom') {
    return (
      <Image
        alt={alt}
        {...otherRest}
        src={imageSrc || getImageUrl('/assets/images/default.webp', 'default')}
        onError={handleError}
        className={cn(className)}
        preload={isLCP}
        fetchPriority={isLCP ? 'high' : 'auto'}
      />
    );
  }

  return (
    <div className={cn(parentClassName, 'relative')}>
      {isHaveOverlay && <div className='absolute inset-0 bg-black/40 rounded-lg pointer-events-none' />}
      <Image
        width={100}
        height={100}
        sizes='100vw'
        alt={alt}
        {...otherRest}
        src={imageSrc || getImageUrl('/assets/images/default.webp', 'default')}
        onError={handleError}
        className={cn(
          type === 'avatar' && 'rounded-full size-full object-cover',
          type === 'default' && 'rounded-lg size-full object-cover',
          type === 'icon' && 'size-full object-cover',
          className,
          objectFit,
        )}
        preload={isLCP}
        fetchPriority={isLCP ? 'high' : 'auto'}
      />
      {extraRender}
    </div>
  );
}
