import { useEffect } from 'react';
import { type FieldErrors } from 'react-hook-form';
import { toast } from 'sonner';

import { IS_PRODUCTION } from '@/cores/configs/core-env.config';
import { showToastError } from '@/cores/utils/core-toast.util';
import useI18n from '@/i18n/hooks/use-i18n.hook';

export default function useFormError(errors: FieldErrors) {
  const { tMessage } = useI18n();

  useEffect(() => {
    if (!Object.keys(errors).length) return;
    !IS_PRODUCTION && console.error('ERROR/useFormError ::: ', errors);

    toast.dismiss();
    showToastError(tMessage('invalid_field'));
  }, [errors, tMessage]);
}
