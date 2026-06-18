// hooks/use-unsaved-changes.ts
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

import { normalizeForDirty, isDeepDirty, type NormalizeMode } from '@/cores/utils/core-form.util';

type Options<TValues extends FieldValues> = {
  /** default: 'undefined-to-empty' (dùng cho form nhập liệu) */
  normalizeMode?: NormalizeMode;
  /** Giá trị mặc định ban đầu (đã pass vào useForm) */
  defaultValues: TValues;
  /** Bật prompt khi đóng tab / refresh (default: false) */
  beforeUnload?: boolean;
  /** Reset form khi defaultValues thay đổi (default: true) */
  resetOnDefaultChange?: boolean;
  /** Hàm thực thi khi xác nhận rời form */
  onConfirmLeave?: () => void;
};

export function useUnsavedChanges<TValues extends FieldValues>(form: UseFormReturn<TValues>, opts: Options<TValues>) {
  const {
    normalizeMode = 'undefined-to-empty',
    defaultValues,
    beforeUnload = false,
    resetOnDefaultChange = true,
    onConfirmLeave,
  } = opts;

  const initialRef = useRef<TValues>(defaultValues);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Đồng bộ khi defaultValues thay đổi
  useEffect(() => {
    initialRef.current = defaultValues;
    if (resetOnDefaultChange) {
      form.reset(defaultValues, { keepDirty: false, keepTouched: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(defaultValues)]);

  // Theo dõi mọi field
  const currentValues = form.watch();

  // Dirty theo RHF + deep compare
  const isDirtyDeep = useMemo(
    () => isDeepDirty<TValues>(currentValues, initialRef.current, normalizeMode),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(normalizeForDirty(currentValues, normalizeMode))],
  );
  const hasRHFDirty =
    form.formState.isDirty || (form.formState.dirtyFields && Object.keys(form.formState.dirtyFields).length > 0);

  const isDirty = isDirtyDeep || hasRHFDirty;

  // ? Cảnh báo khi đóng tab / refresh
  useEffect(() => {
    if (!beforeUnload) return;
    const handler = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = ''; // Chrome yêu cầu set string bất kỳ
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [beforeUnload, isDirty]);

  // ? Clicking cancel, mở modal nếu có thay đổi
  const onCancelClick = () => {
    if (isDirty) setConfirmOpen(true);
    else onConfirmLeave?.();
  };

  // ? user xác nhận rời form
  const confirmLeave = () => {
    setConfirmOpen(false);
    onConfirmLeave?.();
  };

  // ? Đóng dialog, tiếp tục form
  const closeDialog = () => setConfirmOpen(false);

  return {
    isDirty,
    confirmOpen,
    setConfirmOpen,
    onCancelClick,
    confirmLeave,
    closeDialog,
  };
}
