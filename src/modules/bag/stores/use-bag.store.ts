import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { LANDING_SESSION_KEYS } from '@/modules/landing-session/constants/landing-seed.data';

export type BagLineItem = {
  bookId: string;
  quantity: number;
};

type BagStore = {
  items: BagLineItem[];
  addItem: (bookId: string, quantity?: number) => void;
  removeItem: (bookId: string) => void;
  setQuantity: (bookId: string, quantity: number) => void;
  incrementQuantity: (bookId: string) => void;
  decrementQuantity: (bookId: string) => void;
  clearBag: () => void;
};

const useBagStore = create<BagStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (bookId, quantity = 1) => {
        const items = get().items;
        const existing = items.find(item => item.bookId === bookId);

        if (existing) {
          set({
            items: items.map(item =>
              item.bookId === bookId ? { ...item, quantity: item.quantity + quantity } : item,
            ),
          });
          return;
        }

        set({ items: [...items, { bookId, quantity }] });
      },

      removeItem: bookId => {
        set({ items: get().items.filter(item => item.bookId !== bookId) });
      },

      setQuantity: (bookId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(bookId);
          return;
        }

        set({
          items: get().items.map(item => (item.bookId === bookId ? { ...item, quantity } : item)),
        });
      },

      incrementQuantity: bookId => {
        const item = get().items.find(line => line.bookId === bookId);
        if (!item) return;
        get().setQuantity(bookId, item.quantity + 1);
      },

      decrementQuantity: bookId => {
        const item = get().items.find(line => line.bookId === bookId);
        if (!item) return;
        get().setQuantity(bookId, item.quantity - 1);
      },

      clearBag: () => set({ items: [] }),
    }),
    {
      name: LANDING_SESSION_KEYS.bag,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useBagStore;
