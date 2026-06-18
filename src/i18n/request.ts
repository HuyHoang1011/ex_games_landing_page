import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

import { CORE_SETTING } from '@/cores/configs/core-setting.config';
import { localeList, type LocaleType } from '@/i18n/types/language.type';

export const getLocale = async (): Promise<LocaleType> => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(CORE_SETTING.LOCALE);

  if (localeCookie?.value && localeList.includes(localeCookie.value as LocaleType)) {
    return localeCookie.value as LocaleType;
  }

  return 'en';
};

export const getCountry = async (): Promise<string> => {
  const locale = await getLocale();

  const localeCountryMap: Record<LocaleType, string> = {
    vi: 'VN',
    en: 'EN',
  };

  return localeCountryMap[locale] ?? 'VN';
};

export default getRequestConfig(async () => {
  const locale: LocaleType = await getLocale();

  const allLangs = (await import(`./languages/all/${locale}.json`)).default;
  const appBackendLangs = (await import(`./languages/app-backend/${locale}.json`)).default;
  const theSportLangs = (await import(`./languages/thesport/${locale}.json`)).default;

  return {
    locale,
    messages: {
      ...allLangs,
      ...appBackendLangs,
      ...theSportLangs,
    },
  };
});
