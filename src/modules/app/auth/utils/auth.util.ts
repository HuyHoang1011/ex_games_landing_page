import Cookies from 'js-cookie';

import { CORE_SETTING } from '@/cores/configs/core-setting.config';

export const authUtil = {
  getAccessToken: (): string | undefined => Cookies.get(CORE_SETTING.AUTH.ACCESS_TOKEN),
  setAccessToken: (token: string) => {
    Cookies.set(CORE_SETTING.AUTH.ACCESS_TOKEN, token, {
      sameSite: 'strict',
    });
  },
  removeTokens: () => Cookies.remove(CORE_SETTING.AUTH.ACCESS_TOKEN),
  isLoggedIn: (): boolean => !!Cookies.get(CORE_SETTING.AUTH.ACCESS_TOKEN),
};
