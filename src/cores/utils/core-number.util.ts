export function convertShortNum(value: number): string {
  if (!value) return '0';

  const units = [
    { threshold: 1_000_000_000, suffix: 'B' },
    { threshold: 1_000_000, suffix: 'M' },
    { threshold: 1_000, suffix: 'K' },
  ];

  const absValue = Math.abs(value);

  for (const { threshold, suffix } of units) {
    if (absValue >= threshold) {
      return `${(value / threshold).toFixed(1).replace(/\.0$/, '')}${suffix}`;
    }

    // ? Tạm ẩn if (absValue >= threshold) {
    //   const result = value / threshold;
    //   return ${result % 1 === 0 ? result : result.toString()}${suffix};
    // }
  }

  return value.toString();
}

export const normalizePhoneNumber = (phone?: string, phonePrefix = '84'): string => {
  if (!phone) return '';

  const trimmed = phone.trim();

  // chỉ cho phép số
  if (!/^\d+$/.test(trimmed)) return '';

  // 11 số, bắt đầu bằng 84 → giữ nguyên
  if (trimmed.length === 11 && trimmed.startsWith(phonePrefix)) {
    return trimmed;
  }

  // 10 số, bắt đầu bằng 0 → bỏ 0, thêm 84
  if (trimmed.length === 10 && trimmed.startsWith('0')) {
    return `${phonePrefix}${trimmed.slice(1)}`;
  }

  // 9 số → thêm 84
  if (trimmed.length === 9) {
    return `${phonePrefix}${trimmed}`;
  }

  return '';
};
