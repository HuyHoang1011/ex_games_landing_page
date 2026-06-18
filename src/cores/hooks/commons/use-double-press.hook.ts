import { useRef } from 'react';

import { CORE_SETTING } from '@/cores/configs/core-setting.config';

export function useDoublePress(callback: () => void, delay = CORE_SETTING.OTHER.DOUBLE_PRESS_TIME) {
  const lastTouchRef = useRef<number>(0);

  const onClick = () => callback();

  const onTouchStart = () => {
    const now = Date.now();
    if (now - lastTouchRef.current < delay) {
      callback();
    }
    lastTouchRef.current = now;
  };

  return {
    onDoubleClick: onClick, // Desktop
    onTouchStart, // Touch device
  };
}
