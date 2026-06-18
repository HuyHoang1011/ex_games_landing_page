import type { Swiper as SwiperType } from 'swiper/types';

export type KeyGetter<T> = (item: T, index: number) => string;

export interface MakeInfiniteOptions<T> {
  /** Số block lặp để “đệm” 2 bên. Nên là số lẻ. */
  repeat?: number; // default 5
  /** Hàm tạo key ổn định cho từng item gốc */
  keyGetter?: KeyGetter<T>; // default: `${(item as any)?.id ?? index}`
}

export interface InfiniteSlide<T> {
  item: T;
  /** Key duy nhất và ổn định qua render */
  key: string;
  /** Index trong mảng gốc */
  originIndex: number;
}

/**
 * Lặp mảng nguồn nhiều block để giả lập loop vô hạn trong Swiper (không bật loop).
 * Dùng chung cho mọi coverflow/stack/slide với centeredSlides.
 *
 * - Giữ “1 ở giữa + 2 bên” liên tục.
 * - Không clone DOM nội bộ của Swiper -> tránh bug rung/loop vô tận.
 */
export function makeInfiniteSlides<T>(
  base: T[] | null | undefined,
  opts: MakeInfiniteOptions<T> = {},
): InfiniteSlide<T>[] {
  const repeat = opts.repeat ?? 5; // lẻ
  const keyGetter =
    opts.keyGetter ??
    ((it: T, i: number) => {
      const id = (it as any)?.id ?? i;
      return `${String(id)}`;
    });

  const src = Array.isArray(base) ? base.filter(Boolean) : [];
  const L = src.length;
  if (L === 0) return [];

  const blocks: InfiniteSlide<T>[][] = Array.from({ length: repeat }, (_, b) =>
    src.map((item, i) => ({
      item,
      originIndex: i,
      key: `${keyGetter(item, i)}-b${b}-i${i}`,
    })),
  );

  return blocks.flat();
}

/** Tính initialSlide để bắt đầu ở “khối giữa” */
export function getInitialSlide(baseLen: number, repeat = 5): number {
  if (!baseLen) return 0;
  return baseLen * Math.floor(repeat / 2);
}

export interface GuardsOptions {
  /** Độ lặp (phải trùng với repeat khi makeInfiniteSlides) */
  repeat?: number; // default 5
}

/**
 * Trả về các handler gắn vào <Swiper {...handlers} />.
 * Khi user trượt tới mép ngoài, tự “nhảy” tức thời về block giữa tương ứng (speed 0) — không giật.
 */
export function createSwiperGuards(baseLen: number, opts: GuardsOptions = {}) {
  const repeat = opts.repeat ?? 5;
  let swiper: SwiperType | null = null;
  let adjusting = false;

  const blockSize = Math.max(baseLen, 0);

  // Vùng an toàn: không để user đi quá block đầu/cuối —
  // luôn giữ họ trong [block #1 .. block #(repeat-2)]
  const minIndex = blockSize * 1;
  const maxIndex = Math.max(blockSize * (repeat - 2) - 1, 0);

  return {
    onBeforeInit(s: SwiperType) {
      swiper = s;
    },
    onSlideChange(s: SwiperType) {
      if (adjusting || blockSize === 0) return;
      const idx = s.activeIndex;

      // offset từ mép về giữa = blockSize * (repeat/2 - 1)
      const jumpOffset = blockSize * Math.max(Math.floor(repeat / 2 - 1), 0);

      if (idx < minIndex) {
        adjusting = true;
        s.slideTo(idx + jumpOffset, 0); // speed=0 -> vô hình
        requestAnimationFrame(() => {
          adjusting = false;
        });
      } else if (idx > maxIndex) {
        adjusting = true;
        s.slideTo(idx - jumpOffset, 0);
        requestAnimationFrame(() => {
          adjusting = false;
        });
      }
    },
  };
}
