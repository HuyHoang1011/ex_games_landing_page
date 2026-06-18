'use client';

import CoreButton from '@/cores/components/button/core-button';
import CoreLogo from '@/cores/components/images/logo/core-logo';
import { CORE_ROUTER } from '@/cores/configs/core-router.config';
import { useIsMounted } from '@/cores/hooks/commons/use-is-mounted.hook';
import useI18n from '@/i18n/hooks/use-i18n.hook';

interface Props {
  message?: string;
  statusCode?: number;
}

export default function CoreErrorPage({ message, statusCode }: Readonly<Props>) {
  const { tGeneral, tMessage } = useI18n();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  let defaultMsg = message ?? tMessage('failed');

  if (statusCode === 404) {
    defaultMsg = tMessage('page_not_found');
  }

  return (
    <section className='relative overflow-hidden m-auto w-full h-screen flex justify-center items-center bg-app-background'>
      <div className='container'>
        <div className='mx-auto flex max-w-5xl flex-col items-center'>
          <div className='flex flex-col items-center gap-2 text-center'>
            <CoreLogo isHaveSlogan={false} />
            <div>
              <h1 className='mb-6 text-pretty text-2xl font-bold lg:text-5xl text-primary-light'>
                {statusCode ?? 400}
              </h1>
              <p className='text-muted-foreground lg:text-xl'>{defaultMsg}</p>
            </div>

            <div className='mt-4 flex justify-center gap-2'>
              <CoreButton title={tGeneral('go_back')} onClick={() => (window.location.href = CORE_ROUTER.HOME)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
