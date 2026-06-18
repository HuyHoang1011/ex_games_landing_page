import isEqual from 'lodash/isEqual';

export type NormalizeMode = 'empty-to-undefined' | 'undefined-to-empty';

/** Chuẩn hoá giá trị để so sánh dirty công bằng giữa '' và undefined */
export function normalizeForDirty<T = unknown>(obj: T, mode: NormalizeMode = 'undefined-to-empty'): T {
  return JSON.parse(
    JSON.stringify(obj, (_k, v) => {
      if (mode === 'undefined-to-empty') return v === undefined ? '' : v;
      if (mode === 'empty-to-undefined') return v === '' ? undefined : v;
      return v;
    }),
  );
}

/** So sánh deep dirty với chuẩn hoá trước khi so sánh */
export function isDeepDirty<T>(current: T, initial: T, mode: NormalizeMode = 'undefined-to-empty'): boolean {
  return !isEqual(normalizeForDirty(current, mode), normalizeForDirty(initial, mode));
}

export function buildFormData(obj: Record<string, any>): FormData {
  const fd = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // nếu là array thì append nhiều lần
      if (Array.isArray(value)) {
        value.forEach(v => fd.append(`${key}[]`, v));
      } else {
        fd.append(key, value);
      }
    }
  });
  return fd;
}
