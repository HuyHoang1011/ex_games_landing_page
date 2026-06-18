'use client';

import { type ReactNode } from 'react';

import CoreButton from '@/cores/components/button/core-button';
import { cn } from '@/cores/shadcn/lib/utils';
import useI18n from '@/i18n/hooks/use-i18n.hook';

interface Props {
  isLoading?: boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
  isShowCancel?: boolean;
  customButtonSubmit?: ReactNode;
  className?: string;
}

export default function CoreModalFooter({
  isLoading = false,
  onSubmit,
  onCancel,
  isShowCancel = true,
  customButtonSubmit,
  className,
}: Readonly<Props>) {
  const { tAction } = useI18n();
  return (
    <div className={cn('shrink-0 border-t pt-3 flex items-center justify-end gap-2', className)}>
      {customButtonSubmit ? (
        customButtonSubmit
      ) : (
        <CoreButton title={tAction('save')} icon='Save' onClick={onSubmit} isLoading={isLoading} />
      )}
      {isShowCancel && (
        <CoreButton title={tAction('cancel')} variant='outline' onClick={onCancel} disabled={isLoading} />
      )}
    </div>
  );
}
