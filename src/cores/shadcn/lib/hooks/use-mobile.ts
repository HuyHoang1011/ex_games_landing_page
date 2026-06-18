import { useEffect, useState } from 'react';

import { breakpoints } from '@/cores/hooks/theme/use-breakpoints.hook';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoints.md - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoints.md);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < breakpoints.md);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
}
