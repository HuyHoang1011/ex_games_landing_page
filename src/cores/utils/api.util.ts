import { type ParamsType } from '@/cores/apis/core-http.api';

export const getQueryString = (params?: ParamsType): string => {
  if (!params) return '';

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;

    if (Array.isArray(value)) {
      for (const v of value) {
        if (v === undefined || v === null || v === '') continue;
        searchParams.append(key, String(v));
      }
      continue;
    }

    searchParams.append(key, String(value));
  }

  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
};
