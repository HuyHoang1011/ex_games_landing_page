import {
  LANDING_SEED_DATA,
  LANDING_SESSION_FLAG_KEY,
  LANDING_SESSION_KEYS,
  LEGACY_LOCAL_STORAGE_KEYS,
} from '@/modules/landing-session/constants/landing-seed.data';

export const bootstrapLandingSession = () => {
  if (typeof window === 'undefined') return;

  LEGACY_LOCAL_STORAGE_KEYS.forEach(key => {
    localStorage.removeItem(key);
  });

  if (sessionStorage.getItem(LANDING_SESSION_FLAG_KEY)) {
    return;
  }

  sessionStorage.setItem(LANDING_SESSION_KEYS.accounts, JSON.stringify(LANDING_SEED_DATA.accounts));
  sessionStorage.setItem(LANDING_SESSION_FLAG_KEY, '1');
};
