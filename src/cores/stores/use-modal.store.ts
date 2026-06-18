import { create } from 'zustand';

export type ModalType =
  | 'login'
  | 'register'
  | 'change-coin'
  | 'change-point'
  | 'event-detail'
  | 'request-login'
  | 'withdraw'
  | 'live-detail'
  | 'live-detail-more-info'
  | 'installation'
  | 'info-idol-live'
  | 'receive-code'
  | 'share-social'
  | 'notification'
  | 'not-enough-point-gift'
  | 'level-up-guide'
  | 'top-view-rules-rewards'
  | 'first-time-login';

type ConfigModalType = {
  [key: string]: any;
};

interface DataItem {
  title?: string;
  value?: string | string[];
  description?: string;
  status?: string;
  onSubmit?: () => void;
  configModal?: ConfigModalType;
}

interface StoreItem {
  type?: ModalType;
  data?: DataItem;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: DataItem) => void;
  onClose: () => void;
  onCloseV2: () => void;
  setData: (data?: DataItem) => void;
}

const useModalStore = create<StoreItem>(set => ({
  type: undefined,
  data: undefined,
  isOpen: false,
  onOpen: (type: ModalType, data?: DataItem) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: undefined, isOpen: false }),
  onCloseV2: () =>
    set(state => {
      // Không đóng modal nếu là change-coin hoặc change-point
      if (state.type === 'change-coin' || state.type === 'change-point') {
        return state; // Giữ nguyên state, không đóng
      }
      return { type: undefined, isOpen: false };
    }),
  setData: (data?: DataItem) => set({ data }),
}));

export default useModalStore;
