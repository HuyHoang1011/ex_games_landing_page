'use client';

import CoreLogo from '@/cores/components/images/logo/core-logo';
import { cn } from '@/cores/shadcn/lib/utils';
import useI18n from '@/i18n/hooks/use-i18n.hook';

interface Props {
  className?: string;
}

export default function CoreArtPlayerLoading({ className }: Readonly<Props>) {
  const { tGeneral } = useI18n();
  return (
    <div
      className={cn(
        'relative flex h-50 md:h-120 w-full items-center justify-center overflow-hidden bg-[#08090c]',
        className,
      )}
    >
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,72,96,0.18),transparent_42%)]' />
      <div className='absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:100%_18px]' />
      <div className='absolute left-0 top-0 h-full w-1/3 animate-[art-player-scan_1.6s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/10 to-transparent' />

      <div className='relative z-10 flex flex-col items-center gap-4 text-white md:gap-5'>
        <div className='relative flex size-22 items-center justify-center md:size-28'>
          <div className='absolute inset-0 rounded-full border border-primary-light/25' />
          <div className='absolute inset-1 rounded-full border-t-2 border-primary-light animate-spin' />
          <div className='flex size-16 items-center justify-center rounded-full bg-white ring-1 ring-white/10 md:size-20'>
            <CoreLogo href='#' />
          </div>
        </div>

        <div className='text-center'>
          <p className='text-lg font-semibold tracking-wide text-white/90 md:text-2xl'>{tGeneral('loading')}</p>
          <p className='mt-1 text-sm text-white/50 md:text-base'>{tGeneral('loading_connect_stream')}</p>
        </div>

        <div className='h-1.5 w-44 overflow-hidden rounded-full bg-white/10 md:h-2 md:w-60'>
          <div className='h-full w-1/2 animate-[art-player-progress_1.4s_ease-in-out_infinite] rounded-full bg-primary-light' />
        </div>
      </div>

      <style jsx>{`
        @keyframes art-player-scan {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(360%);
          }
        }

        @keyframes art-player-progress {
          0% {
            transform: translateX(-110%);
          }
          100% {
            transform: translateX(220%);
          }
        }
      `}</style>
    </div>
  );
}
