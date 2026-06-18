'use client';

import type { ReactNode } from 'react';

import ToasterProvider from '@/cores/providers/toaster-provider';
import AuthModal from '@/modules/auth/components/auth-modal';
import LandingSessionBootstrap from '@/modules/landing-session/components/landing-session-bootstrap';
import Header from '@/modules/others/layouts/components/header';

export default function LayoutHomeClient({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className='flex min-h-dvh flex-col bg-landing-cream'>
      <LandingSessionBootstrap />
      <div className='landing-shell flex min-h-dvh flex-col'>
        <Header />
        <main className='flex-1 py-6'>{children}</main>
      </div>
      <AuthModal />
      <ToasterProvider />
    </div>
  );
}
