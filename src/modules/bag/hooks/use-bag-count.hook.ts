'use client';

import { useEffect, useState } from 'react';

import useBagStore from '@/modules/bag/stores/use-bag.store';

export const useBagLineCount = () => {
  const lineCount = useBagStore(state => state.items.length);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? lineCount : 0;
};

export const useBagTotalQuantity = () => {
  const totalQuantity = useBagStore(state => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? totalQuantity : 0;
};
