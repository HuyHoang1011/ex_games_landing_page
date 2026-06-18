import get from 'lodash/get';
import { toast } from 'sonner';

import { type ResponseType } from '@/cores/apis/core-http.api';
import { type CoreAlertPayload, useCoreAlertStore } from '@/cores/components/alert/stores/use-core-alert.store';
import { IS_LOCAL, IS_PRODUCTION } from '@/cores/configs/core-env.config';
import { type TAppBeResponseType } from '@/i18n/types/language.type';

type ToastType = 'success' | 'info' | 'error' | 'warning';

interface ToastProps extends Partial<CoreAlertPayload> {
  type?: ToastType;
  title?: string;
  description?: string;
  customVariant?: CoreAlertPayload['variant'];
}

export const showToast = ({ type = 'info', title, description }: Readonly<ToastProps>) => {
  const mapTitles: Record<ToastType, string> = {
    success: 'Success',
    info: 'Notification',
    error: 'Error',
    warning: 'Warning',
  };

  if (IS_LOCAL) {
    toast[type](`${title ?? mapTitles[type]}!`, {
      description,
    });
  } else {
    console.log(`[TOAST:${type.toUpperCase()}] ${title ?? mapTitles[type]}`, description ?? '');
  }
};

export const showToastInfo = (description: string) => showToast({ type: 'info', description });
export const showToastSuccess = (description: string) => showToast({ type: 'success', description });
export const showToastWarning = (description: string) => showToast({ type: 'warning', description });
export const showToastError = (description: string) => showToast({ type: 'error', description });

export const showToastAlert = ({
  type = 'info',
  title,
  description,
  customVariant = 'confirm',
  ...rest
}: Readonly<ToastProps>) => {
  const mapTitles: Record<ToastType, string> = {
    success: 'Success',
    info: 'Notification',
    error: 'Error',
    warning: 'Warning',
  };

  useCoreAlertStore.getState().open({
    variant: customVariant,
    type,
    title: title ?? mapTitles[type],
    description,
    ...rest,
  });
};

export const showToastInfoAlert = (description: string, title?: string, options?: Partial<CoreAlertPayload>) =>
  showToastAlert({
    type: 'info',
    title: title ?? 'Notification',
    description,
    duration: 3000,
    customVariant: options?.customVariant ?? 'toast',
    ...options,
  });
export const showToastSuccessAlert = (description: string, title?: string, options?: Partial<CoreAlertPayload>) =>
  showToastAlert({
    type: 'success',
    title: title ?? 'Success',
    description,
    duration: 3000,
    customVariant: options?.customVariant ?? 'toast',
    ...options,
  });
export const showToastWarningAlert = (description: string, title?: string, options?: Partial<CoreAlertPayload>) =>
  showToastAlert({
    type: 'warning',
    title: title ?? 'Warning',
    description,
    duration: 3000,
    customVariant: options?.customVariant ?? 'confirm',
    ...options,
  });
export const showToastErrorAlert = (description: string, title?: string, options?: Partial<CoreAlertPayload>) =>
  showToastAlert({
    type: 'error',
    title: title ?? 'Error',
    description,
    duration: 3000,
    customVariant: options?.customVariant ?? 'toast',
    ...options,
  });

const getResponseErrorMessage = (error: unknown, tResponse?: TAppBeResponseType) => {
  const responseError = error as ResponseType<undefined>;
  !IS_PRODUCTION && console.log('showAlertResponseError/responseError ::: ', responseError);

  return responseError.code ? tResponse?.(responseError.code) : get(responseError, 'message', '');
};

export const showToastResponseError = (
  error: unknown,
  tResponse?: TAppBeResponseType,
  options?: Partial<CoreAlertPayload>,
) => {
  const errorMsg = getResponseErrorMessage(error, tResponse);
  showToastErrorAlert(errorMsg ?? tResponse?.('BAD_REQUEST') ?? '', undefined, options);
};

export const showToastResponseInfo = (
  error: unknown,
  tResponse?: TAppBeResponseType,
  options?: Partial<CoreAlertPayload>,
) => {
  const errorMsg = getResponseErrorMessage(error, tResponse);
  showToastInfoAlert(errorMsg ?? tResponse?.('BAD_REQUEST') ?? '', undefined, options);
};
