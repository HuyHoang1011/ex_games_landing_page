import includes from 'lodash/includes';

export const cleanObjectValue = <T = Record<string, any>>(
  obj: Record<string, any>,
  options?: {
    defaultValue?: {
      [key: string]: string | number | null | undefined;
    };
    keysToExclude?: string[]; // ? Bỏ qua và giữ giá trị cho các key này không cần cleanData
    keysToForceClean?: string[]; // ? Remove những case này ra khỏi object
  },
): T => {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (includes(options?.keysToForceClean, key)) {
      continue;
    }

    let value = obj[key];

    if (includes(options?.keysToExclude, key)) {
      result[key] = value;
      continue;
    }

    // Giữ lại giá trị từ defaultValue nếu nó tồn tại, bất kể giá trị của nó
    if (
      (value === null || value === undefined || value === '') &&
      options?.defaultValue &&
      key in options.defaultValue
    ) {
      result[key] = options.defaultValue[key];
    } else if (value !== null && value !== undefined && value !== '') {
      // Giữ lại các giá trị hợp lệ từ obj nếu không có defaultValue
      result[key] = value;
    }
  }

  return result as T;
};

export function jsonParse<T>(str: string | null, fallback: T): T {
  try {
    if (!str) return fallback;
    return JSON.parse(str) as T;
  } catch {
    return fallback;
  }
}
