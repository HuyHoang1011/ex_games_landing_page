import { create } from 'zustand';

export type PendingAuthAction =
  | { type: 'add-to-bag'; bookId: string }
  | { type: 'open-bag' };

export type AuthModalView = 'login' | 'register';

type AuthModalStore = {
  isOpen: boolean;
  view: AuthModalView;
  pendingAction: PendingAuthAction | null;
  openLogin: (pendingAction?: PendingAuthAction) => void;
  openRegister: (pendingAction?: PendingAuthAction) => void;
  close: () => void;
  setView: (view: AuthModalView) => void;
  takePendingAction: () => PendingAuthAction | null;
};

const useAuthModalStore = create<AuthModalStore>((set, get) => ({
  isOpen: false,
  view: 'login',
  pendingAction: null,

  openLogin: pendingAction => set({ isOpen: true, view: 'login', pendingAction: pendingAction ?? null }),

  openRegister: pendingAction => set({ isOpen: true, view: 'register', pendingAction: pendingAction ?? null }),

  close: () => set({ isOpen: false, pendingAction: null }),

  setView: view => set({ view }),

  takePendingAction: () => {
    const pendingAction = get().pendingAction;
    set({ pendingAction: null });
    return pendingAction;
  },
}));

export default useAuthModalStore;
