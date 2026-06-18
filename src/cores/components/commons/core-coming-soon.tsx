'use client';

import CoreLogo from '@/cores/components/images/logo/core-logo';
import useI18n from '@/i18n/hooks/use-i18n.hook';

export default function CoreComingSoon() {
  const { tMessage } = useI18n();

  return (
    <section className='relative overflow-hidden w-full h-full flex justify-center items-center'>
      <div className='container'>
        <div className='mx-auto flex max-w-5xl flex-col items-center'>
          <div className='flex flex-col items-center gap-6 text-center'>
            <CoreLogo />
            <div>
              <h1 className='mb-6 text-pretty text-2xl font-bold lg:text-5xl text-primary'>
                {tMessage('coming_soon2')}
              </h1>
              <p className='text-muted-foreground lg:text-xl'>{tMessage('developing2')}</p>
            </div>
            {/* <div className='mt-4 flex justify-center gap-2'>
              <CoreButton title={tMenu('home')} />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
