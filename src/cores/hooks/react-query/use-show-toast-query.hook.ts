import { useEffect } from 'react';

import { getErrorMessage } from '@/cores/utils/core-error.util';
import { showToast } from '@/cores/utils/core-toast.util';
import useI18n from '@/i18n/hooks/use-i18n.hook';

type ToastOption = {
  msgSuccess?: string;
  msgError?: string;
  triggerError?: boolean;
  triggerSuccess?: boolean;
};

export const useShowToastQuery = (
  {
    isSuccess,
    isError,
    error,
  }: {
    isSuccess?: boolean;
    isError?: boolean;
    error?: unknown;
  },
  options?: ToastOption,
) => {
  const { tMessage } = useI18n();

  const { msgSuccess, msgError, triggerError = true, triggerSuccess = false } = options || {};

  useEffect(() => {
    if (triggerSuccess && isSuccess && msgSuccess) {
      showToast({
        type: 'success',
        title: tMessage('success'),
        description: msgSuccess,
      });
    }
  }, [isSuccess, msgSuccess, triggerSuccess, tMessage]);

  useEffect(() => {
    if (triggerError && isError && error) {
      const message = msgError || getErrorMessage(error, tMessage('failed'));
      showToast({
        type: 'error',
        title: tMessage('error'),
        description: message,
      });
    }
  }, [isError, error, msgError, triggerError, tMessage]);
};
