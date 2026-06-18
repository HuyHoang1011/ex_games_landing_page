'use client';

import { useEffect, useRef } from 'react';

import { useAuthStatus } from '@/modules/auth/hooks/use-auth.hook';
import useAuthModalStore from '@/modules/auth/stores/use-auth-modal.store';

type BagAuthGuardProps = {
  children: React.ReactNode;
};

export default function BagAuthGuard({ children }: Readonly<BagAuthGuardProps>) {
  const authStatus = useAuthStatus();
  const openLogin = useAuthModalStore(state => state.openLogin);
  const close = useAuthModalStore(state => state.close);
  const hasOpenedModal = useRef(false);

  useEffect(() => {
    if (authStatus === 'loading') return;

    if (authStatus === 'authenticated') {
      close();
      return;
    }

    if (!hasOpenedModal.current) {
      hasOpenedModal.current = true;
      openLogin({ type: 'open-bag' });
    }
  }, [authStatus, close, openLogin]);

  if (authStatus === 'loading') {
    return null;
  }

  if (authStatus === 'unauthenticated') {
    return (
      <div className='mt-10 rounded-2xl border border-dashed border-[#ddd4c8] bg-white/70 px-6 py-16 text-center'>
        <h2 className='font-serif text-2xl font-semibold text-landing-brown-dark'>Sign in to view your bag</h2>
        <p className='mt-3 text-sm text-[#7a7064]'>Your saved titles will appear here once you are signed in.</p>
        <button
          type='button'
          onClick={() => openLogin({ type: 'open-bag' })}
          className='mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#8b4538] px-6 text-sm font-semibold text-white transition hover:bg-[#7a3c31]'
        >
          Sign in
        </button>
      </div>
    );
  }

  return children;
}
