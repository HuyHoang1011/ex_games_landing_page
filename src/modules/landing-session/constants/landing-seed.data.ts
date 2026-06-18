import { DEMO_CREDENTIALS } from '@/modules/auth/constants/auth.constant';

export type SeedAccount = {
  email: string;
  password: string;
};

export const LANDING_SESSION_FLAG_KEY = 'pages-co-session-ready';

export const LANDING_SESSION_KEYS = {
  accounts: 'pages-co-accounts',
  auth: 'pages-co-auth',
  bag: 'pages-co-bag',
} as const;

/** Legacy localStorage keys — cleared on bootstrap so data does not persist across browser sessions. */
export const LEGACY_LOCAL_STORAGE_KEYS = [
  LANDING_SESSION_KEYS.auth,
  LANDING_SESSION_KEYS.bag,
  LANDING_SESSION_KEYS.accounts,
] as const;

export const LANDING_SEED_DATA = {
  accounts: [
    {
      email: DEMO_CREDENTIALS.email,
      password: DEMO_CREDENTIALS.password,
    },
  ] satisfies SeedAccount[],
};
