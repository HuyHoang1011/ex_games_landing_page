'use client';

import React from 'react';

import { useIsMounted } from '@/cores/hooks/commons/use-is-mounted.hook';

interface Props {
  desktopContent: React.ReactNode;
  mobileContent: React.ReactNode;
  isMobile: boolean;
  className?: string;
}

export default function BaseFooter({ desktopContent, mobileContent, isMobile, className }: Readonly<Props>) {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return <footer className={className}>{isMobile ? mobileContent : desktopContent}</footer>;
}
