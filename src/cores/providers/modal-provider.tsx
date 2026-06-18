'use client';

import dynamic from 'next/dynamic';

import CoreAlertPopup from '@/cores/components/alert/core-alert';
import RequestLogin from '@/cores/components/request/request-login';
import { useIsMounted } from '@/cores/hooks/commons/use-is-mounted.hook';

export const ModalProvider = () => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <>

    </>
  );
};
