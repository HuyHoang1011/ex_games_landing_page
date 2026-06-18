import map from 'lodash/map';

import { type ComboBoxType } from '@/cores/types/core-type.type';
import type allViType from '@/i18n/languages/all/vi.json';
import type appBackendViType from '@/i18n/languages/app-backend/vi.json';
import type theSportViType from '@/i18n/languages/thesport/vi.json';

export type IAllLang = typeof allViType;
export type IAppBackendLang = typeof appBackendViType;
export type ITheSportLang = typeof theSportViType;

export type TranslationParamsType = {
  [key: string]: string | number;
};

export type TranslationDefaultAllType = keyof IAllLang;
export type TranslationGeneralType = keyof IAllLang['general'];
export type TranslationMessageType = keyof IAllLang['message'];
export type TranslationActionType = keyof IAllLang['action'];
export type TranslationFormType = keyof IAllLang['form'];
export type TranslationMenuType = keyof IAllLang['menu'];
export type TranslationAuthType = keyof IAllLang['auth'];
export type TranslationBlvType = keyof IAllLang['blv'];
export type TranslationLanguageType = keyof IAllLang['language'];
export type TranslationProfileType = keyof IAllLang['profile'];
export type TranslationNoticeType = keyof IAllLang['notice'];
export type TranslationValidateFormType = keyof IAllLang['validate_form_message'];
export type TranslationChangePasswordType = keyof IAllLang['change_password'];
export type TranslationNotificationAbcVipType = keyof IAllLang['notificationAbcvip'];
export type TranslationOtherType = keyof IAllLang['other'];
export type TransAppBeResponseType = keyof IAppBackendLang['response'];
export type TranslationTheSportType = keyof ITheSportLang;

export type TDefaultAllType = (key: TranslationDefaultAllType, paramsType?: TranslationParamsType) => string;
export type TGeneralType = (key: TranslationGeneralType, paramsType?: TranslationParamsType) => string;
export type TMessageType = (key: TranslationMessageType, paramsType?: TranslationParamsType) => string;
export type TActionType = (key: TranslationActionType, paramsType?: TranslationParamsType) => string;
export type TFormType = (key: TranslationFormType, paramsType?: TranslationParamsType) => string;
export type TMenuType = (key: TranslationMenuType, paramsType?: TranslationParamsType) => string;
export type TAuthType = (key: TranslationAuthType, paramsType?: TranslationParamsType) => string;
export type TLanguageType = (key: TranslationLanguageType, paramsType?: TranslationParamsType) => string;
export type TBlvType = (key: TranslationBlvType, paramsType?: TranslationParamsType) => string;
export type TProfileType = (key: TranslationProfileType, paramsType?: TranslationParamsType) => string;
export type TNoticeType = (key: TranslationNoticeType, paramsType?: TranslationParamsType) => string;
export type TValidateFormType = (key: TranslationValidateFormType, paramsType?: TranslationParamsType) => string;
export type TChangePasswordType = (key: TranslationChangePasswordType, paramsType?: TranslationParamsType) => string;
export type TNotificationAbcVipType = (
  key: TranslationNotificationAbcVipType,
  paramsType?: TranslationParamsType,
) => string;
export type TOtherType = (key: TranslationOtherType, paramsType?: TranslationParamsType) => string;
export type TAppBeResponseType = (key: TransAppBeResponseType, paramsType?: TranslationParamsType) => string;
export type TTheSportType = (key: TranslationTheSportType, paramsType?: TranslationParamsType) => string;

export type LocaleType = 'vi' | 'en';

export const localeList: LocaleType[] = ['vi', 'en'];
export const localeDefault: LocaleType = 'en';
export const localeListName: Record<LocaleType, string> = {
  vi: 'Vietnamese',
  en: 'English',
};

export const localeListLanguage: ComboBoxType<LocaleType>[] = map(localeList, locale => ({
  value: locale,
  label: localeListName[locale],
}));
