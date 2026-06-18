import { useEffect, useState } from 'react';

import { CORE_SETTING } from '@/cores/configs/core-setting.config';

export function useDebounce<T>(value: T, delay = CORE_SETTING.OTHER.DEBOUNCE_TIME) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
