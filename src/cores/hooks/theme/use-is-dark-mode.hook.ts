'use client';
import { useTheme } from 'next-themes';

import { useIsMounted } from '@/cores/hooks/commons/use-is-mounted.hook';

export default function useIsDarkMode() {
  const isMounted = useIsMounted();
  const { theme } = useTheme();

  if (!isMounted) return false;

  const isDarkMode = theme === 'dark';

  return isDarkMode;
}
