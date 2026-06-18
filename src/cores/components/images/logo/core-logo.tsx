'use client';
import Link from 'next/link';
import { type HTMLAttributeAnchorTarget } from 'react';

import CoreImage from '@/cores/components/images/core-image';
import { CORE_ENV } from '@/cores/configs/core-env.config';
import { CORE_ROUTER } from '@/cores/configs/core-router.config';
import { useIsMounted } from '@/cores/hooks/commons/use-is-mounted.hook';
import { useIsMobile } from '@/cores/shadcn/lib/hooks/use-mobile';
import { cn } from '@/cores/shadcn/lib/utils';
import { getImageUrl } from '@/cores/utils/core-image.util';

interface Props {
  title?: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  parentClassName?: string;
  isHaveSlogan?: boolean;
  forceTheme?: 'light' | 'dark';
  size?: 'sm' | 'lg' | 'xl' | 'modal' | 'footer' | 'default';
}

export default function CoreLogo({
  title = '',
  href = CORE_ROUTER.HOME,
  target = '_self',
  parentClassName = '',
  isHaveSlogan = false,
  forceTheme = 'light',
  size = 'default',
}: Readonly<Props>) {
  const isMobile = useIsMobile();
  const isMounted = useIsMounted();

  // const forceMode = forceTheme ?? (isDarkMode ? 'dark' : 'light');
  const forceMode = forceTheme;

  const configLogoUrl = '/assets/images/logo/main-logo.webp';
  const logoSrc = size === 'lg' ? '/assets/images/logo/logo-auth.webp' : configLogoUrl;

  if (!logoSrc) {
    return null;
  }

  const getParentClassName = () => {
    switch (size) {
      case 'sm':
        return 'w-auto w-[98px] h-8 object-contain';
      case 'lg':
        return 'w-auto h-20 md:h-[96px] object-contain';
      case 'xl':
        return 'w-auto h-[105px] object-contain';
      case 'modal':
        return 'w-full max-w-[382.4px] h-[96px] md:h-[128px] object-contain';
      case 'footer':
        return 'w-[365.82px] h-[75px] object-contain';
      default:
        return 'w-auto h-[150px] md:h-[49px] object-contain';
    }
  };

  if (!isMounted) return null;

  return (
    <Link
      href={href}
      target={target}
      className={cn(
        'flex-center flex-col text-lg font-semibold md:text-base gap-x-1 my-2 text-center',
        href !== '#' ? '' : 'cursor-default',
        parentClassName,
        isMobile && !isHaveSlogan ? 'w-[172px] h-[54px] xl:w-auto my-0' : '',
      )}
    >
      <CoreImage
        type='custom'
        width={100}
        height={100}
        sizes='100vw'
        src={getImageUrl(logoSrc, 'default')}
        alt={title || `${CORE_ENV.APP.NAME} logo`}
        className={getParentClassName()}
        isLCP
      />
    </Link>
  );
}
