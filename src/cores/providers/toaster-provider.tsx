'use client';

import React from 'react';
import { Toaster } from 'sonner';

import { useIsMounted } from '@/cores/hooks/commons/use-is-mounted.hook';
import { useIsMobile } from '@/cores/shadcn/lib/hooks/use-mobile';

export default function ToasterProvider() {
  const isMobile = useIsMobile();
  const isMounted = useIsMounted();
  return !isMounted ? null : (
    <Toaster
      position={isMobile ? 'top-center' : 'bottom-right'}
      expand={true}
      duration={3000}
      richColors
      closeButton
      toastOptions={{
        classNames: {
          title: 'text-base',
        },
      }}
    />
  );
}
