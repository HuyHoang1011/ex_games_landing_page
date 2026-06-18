import { create } from 'zustand';

export type CoreAlertType = 'success' | 'info' | 'error' | 'warning';
export type CoreAlertVariant = 'toast' | 'confirm';
export type CoreAlertPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

export interface CoreAlertPayload {
  type: CoreAlertType;
  title: string;
  description?: string;
  variant?: CoreAlertVariant;
  placement?: CoreAlertPlacement;
  duration?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  customVariant?: CoreAlertPayload['variant'];
}

interface CoreAlertState {
  alert: CoreAlertPayload | null;
  open: (payload: CoreAlertPayload) => void;
  close: () => void;
}

export const useCoreAlertStore = create<CoreAlertState>(set => ({
  alert: null,
  open: payload => set({ alert: payload }),
  close: () => set({ alert: null }),
}));
