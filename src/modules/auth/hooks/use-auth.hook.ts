'use client';

import { useEffect, useState } from 'react';

import useAuthStore from '@/modules/auth/stores/use-auth.store';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export const useAuthHydrated = () => {
  const [hydrated, setHydrated] = useState(() => useAuthStore.persist.hasHydrated());

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }

    return useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
  }, []);

  return hydrated;
};

export const useAuthStatus = (): AuthStatus => {
  const user = useAuthStore(state => state.user);
  const hydrated = useAuthHydrated();

  if (!hydrated) return 'loading';
  return user ? 'authenticated' : 'unauthenticated';
};

export const useIsAuthenticated = () => useAuthStatus() === 'authenticated';

export const useAuthUser = () => {
  const user = useAuthStore(state => state.user);
  const hydrated = useAuthHydrated();

  if (!hydrated) return null;
  return user;
};
