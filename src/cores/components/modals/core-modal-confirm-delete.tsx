'use client';

import CoreModalConfirm, { type ICoreModal } from '@/cores/components/modals/core-modal-confirm';
import useI18n from '@/i18n/hooks/use-i18n.hook';

interface Props extends ICoreModal {}

export default function CoreModalConfirmDelete({ open, subTitle, subTitle2, onClose, onConfirm }: Readonly<Props>) {
  const { tAction, tMessage } = useI18n();

  return (
    <CoreModalConfirm
      title={tAction('confirm')}
      type='danger'
      subTitle={subTitle ?? `${tMessage('are_your_sure')}`}
      subTitle2={subTitle2}
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
