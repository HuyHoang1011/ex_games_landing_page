'use client';
import type { ReactNode } from 'react';

import { useIsMounted } from '@/cores/hooks/commons/use-is-mounted.hook';

export default function CoreContainerMounting({ children }: { children: ReactNode }) {
  const isMounted = useIsMounted();
  if (!isMounted) return null;
  return <>{children}</>;
}
