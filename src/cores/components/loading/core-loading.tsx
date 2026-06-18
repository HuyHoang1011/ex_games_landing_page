'use client';
import map from 'lodash/map';

import CoreLogo from '@/cores/components/images/logo/core-logo';
import LoadingSemiCircle from '@/cores/components/loading/loading-semi-circle';
import { cn } from '@/cores/shadcn/lib/utils';
import { getImageUrl } from '@/cores/utils/core-image.util';
import useI18n from '@/i18n/hooks/use-i18n.hook';

interface Props {
  className?: string;
  parentClassName?: string;
  isShowOverlay?: boolean;
  isShowTextLoading?: boolean;
  version?: 'default' | 'v1' | 'fullscreen';
}

export default function CoreLoading({
  parentClassName,
  className,
  isShowOverlay = false,
  isShowTextLoading = true,
  version = 'v1',
}: Readonly<Props>) {
  const { tGeneral } = useI18n();
  const render = () => {
    switch (version) {
      case 'v1':
        return (
          <div className={cn('relative flex flex-col items-center justify-center py-12 px-6', className)}>
            {/* Glow pulse around logo */}
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
              <div className='absolute size-32 rounded-full bg-primary-light/10 blur-2xl animate-ping'></div>
              <div className='absolute size-48 rounded-full border border-primary-light/20 animate-ping delay-200'></div>
              <div className='absolute size-60 rounded-full border border-primary-light/10 animate-ping delay-500'></div>
            </div>

            {/* Logo */}
            <div className='relative z-10'>
              <CoreLogo href='#' />
            </div>

            {/* Loading text */}
            {isShowTextLoading && (
              <div className='text-primary text-base font-semibold tracking-wide animate-pulse z-10'>
                {tGeneral('loading')}
              </div>
            )}

            {/* Bouncing dots */}
            <div className='flex space-x-2 mt-3 z-10'>
              {map([...Array(5)], (_, i) => (
                <div
                  key={i}
                  className='w-2.5 h-2.5 rounded-full bg-primary-light animate-bounce'
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        );
      case 'fullscreen':
        return (
          <div className='relative flex flex-col flex-1 items-center justify-center min-h-screen bg-app-black-dark overflow-hidden'>
            {/* Background */}
            <div
              className='absolute inset-0 opacity-90 bg-cover bg-center'
              style={{
                backgroundImage: `url(${getImageUrl('/assets/images/home/background/bg-main-dark.webp')})`,
              }}
            />

            {/* Pulse effect around logo */}
            <div className='absolute z-10'>
              {/* Glow rings */}
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='absolute size-40 rounded-full bg-primary-light/10 blur-2xl animate-ping'></div>
                <div className='absolute size-60 rounded-full border border-primary-light/20 animate-ping delay-200'></div>
                <div className='absolute size-80 rounded-full border border-primary-light/10 animate-ping delay-500'></div>
              </div>

              {/* Logo */}
              <div className='relative z-10'>
                <CoreLogo href='#' />
              </div>
            </div>

            {isShowTextLoading && (
              <div className='mt-36 text-primary-light text-xl font-bold tracking-wider animate-pulse z-10'>
                {tGeneral('loading')}
              </div>
            )}

            {/* Dots wave animation */}
            <div className='flex space-x-2 mt-4 z-10'>
              {map([...Array(5)], (_, i) => (
                <div
                  key={i}
                  className='w-3 h-3 rounded-full bg-primary-light animate-bounce'
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        );
      default:
        return (
          <>
            {/* <Loader2 className={cn('size-6 animate-spin text-app-primary-light', className)} /> */}
            <LoadingSemiCircle className={className} />
            {isShowTextLoading && <span>{tGeneral('loading')}</span>}
          </>
        );
    }
  };

  return (
    <div className={cn('relative flex justify-center items-center gap-x-1 text-xs text-primary', parentClassName)}>
      {isShowOverlay && (
        <div
          className={cn(
            `cursor-wait overlay-item absolute z-40 size-full top-0 bg-linear-to-r from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.2)] rounded-lg`,
          )}
        />
      )}
      {render()}
    </div>
  );
}
