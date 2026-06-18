import { DEMO_CREDENTIALS } from '@/modules/auth/constants/auth.constant';

import { LANDING_SESSION_KEYS } from '@/modules/landing-session/constants/landing-seed.data';

const ACCOUNTS_STORAGE_KEY = LANDING_SESSION_KEYS.accounts;

type StoredAccount = {
  email: string;
  password: string;
};

const readAccounts = (): StoredAccount[] => {
  if (typeof window === 'undefined') return [];

  try {
    const raw = sessionStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as StoredAccount[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeAccounts = (accounts: StoredAccount[]) => {
  sessionStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
};

export const authAccountsUtil = {
  isRegistered: (email: string) => readAccounts().some(account => account.email === email),

  register: (email: string, password: string): { success: boolean; error?: string } => {
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === DEMO_CREDENTIALS.email) {
      return { success: false, error: 'This email is reserved. Please use a different email.' };
    }

    if (authAccountsUtil.isRegistered(normalizedEmail)) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    writeAccounts([...readAccounts(), { email: normalizedEmail, password }]);

    return { success: true };
  },

  validateCredentials: (email: string, password: string): boolean => {
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === DEMO_CREDENTIALS.email) {
      return password === DEMO_CREDENTIALS.password;
    }

    const account = readAccounts().find(item => item.email === normalizedEmail);
    return account?.password === password;
  },
};
