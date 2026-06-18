'use client';

import { useMemo } from 'react';

/**
 * useTruncateMiddle
 * Cắt chuỗi giữa, giữ đầu và cuối, thêm "..."
 * @param text string | undefined
 * @param maxChars số ký tự hiển thị
 * @returns { display, full }
 */
export function useTruncateMiddle(text?: string, maxChars: number = 36) {
  const display = useMemo(() => {
    if (!text) return '';
    if (text.length <= maxChars) return text;

    const head = text.slice(0, Math.max(0, Math.floor(maxChars / 2)));
    const tail = text.slice(-Math.max(0, Math.ceil(maxChars / 2) - 3));
    return `${head}...${tail}`;
  }, [text, maxChars]);

  return { display, full: text ?? '' };
}
