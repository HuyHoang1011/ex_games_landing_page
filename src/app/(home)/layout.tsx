import type { ReactNode } from 'react';

import LayoutHomeClient from '@/modules/others/layouts/components/layout-home-client';

export default function LayoutHome({ children }: Readonly<{ children: ReactNode }>) {
  return <LayoutHomeClient>{children}</LayoutHomeClient>;
}
