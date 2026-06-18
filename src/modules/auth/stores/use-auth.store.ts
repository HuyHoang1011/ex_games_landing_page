import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { authUtil } from '@/modules/app/auth/utils/auth.util';
import { AUTH_STORAGE_KEY } from '@/modules/auth/constants/auth.constant';
import { authAccountsUtil } from '@/modules/auth/utils/auth-accounts.util';

export type AuthUser = {
  email: string;
};

type AuthStore = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
};

const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      user: null,

      login: async (email, password) => {
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail.includes('@')) {
          return { success: false, error: 'Please enter a valid email address.' };
        }

        if (!password) {
          return { success: false, error: 'Please enter your password.' };
        }

        if (!authAccountsUtil.validateCredentials(normalizedEmail, password)) {
          return { success: false, error: 'Invalid email or password.' };
        }

        authUtil.setAccessToken(`pages-co-${normalizedEmail}`);
        set({ user: { email: normalizedEmail } });

        return { success: true };
      },

      register: async (email, password) => {
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail.includes('@')) {
          return { success: false, error: 'Please enter a valid email address.' };
        }

        if (password.length < 6) {
          return { success: false, error: 'Password must be at least 6 characters.' };
        }

        const registerResult = authAccountsUtil.register(normalizedEmail, password);

        if (!registerResult.success) {
          return registerResult;
        }

        authUtil.setAccessToken(`pages-co-${normalizedEmail}`);
        set({ user: { email: normalizedEmail } });

        return { success: true };
      },

      logout: () => {
        authUtil.removeTokens();
        set({ user: null });
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: state => ({ user: state.user }),
      onRehydrateStorage: () => state => {
        if (state?.user) {
          authUtil.setAccessToken(`pages-co-${state.user.email}`);
        }
      },
    },
  ),
);

export default useAuthStore;
