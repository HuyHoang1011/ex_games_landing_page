import { useTranslations } from 'next-intl';

import { type DeepKey } from '@/cores/types/deep-key.type';
import {
  type IAllLang,
  type IAppBackendLang,
  type ITheSportLang,
  type TActionType,
  type TAppBeResponseType,
  type TAuthType,
  type TBlvType,
  type TChangePasswordType,
  type TDefaultAllType,
  type TFormType,
  type TGeneralType,
  type TLanguageType,
  type TMenuType,
  type TMessageType,
  type TNoticeType,
  type TNotificationAbcVipType,
  type TOtherType,
  type TProfileType,
  type TTheSportType,
  type TValidateFormType,
} from '@/i18n/types/language.type';

const useI18n = () => ({
  tAll: useCustomTranslations() as TDefaultAllType,
  tGeneral: useCustomTranslations('general') as TGeneralType,
  tAction: useCustomTranslations('action') as TActionType,
  tForm: useCustomTranslations('form') as TFormType,
  tMessage: useCustomTranslations('message') as TMessageType,
  tMenu: useCustomTranslations('menu') as TMenuType,
  tAuth: useCustomTranslations('auth') as TAuthType,
  tLanguage: useCustomTranslations('language') as TLanguageType,
  tProfile: useCustomTranslations('profile') as TProfileType,
  tNotice: useCustomTranslations('notice') as TNoticeType,
  tBlv: useCustomTranslations('blv') as TBlvType,
  tNotificationAbcVip: useCustomTranslations('notificationAbcvip') as TNotificationAbcVipType,
  tOther: useCustomTranslations('other') as TOtherType,
  tValidateForm: useCustomTranslations('validate_form_message') as TValidateFormType,
  tChangePassword: useCustomTranslations('change_password') as TChangePasswordType,
});

export const useI18nAppBe = () => ({
  tResponse: useCustomTranslations<IAppBackendLang>('response') as TAppBeResponseType,
});

export const useI18nTheSport = () => ({
  tTheSport: useCustomTranslations<ITheSportLang>() as TTheSportType,
});

function useCustomTranslations<T = IAllLang | IAppBackendLang>(namespace?: DeepKey<T>) {
  return useTranslations(namespace);
}

export default useI18n;
