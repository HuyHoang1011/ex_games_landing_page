export type SlugifyOptions = {
  lower?: boolean; // default: true
  maxLength?: number; // cắt bớt nếu quá dài
  replacement?: string; // default: '-'
  trim?: boolean; // default: true (bỏ "-" ở đầu/cuối)
};

export function slugify(input: string, opts: SlugifyOptions = {}): string {
  const { lower = true, maxLength, replacement = '-', trim = true } = opts;

  if (!input) return '';

  // normalize Unicode (tách dấu) + thay đ/Đ thành d
  let s = input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // bỏ dấu
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd');

  // thay mọi ký tự không phải a-z0-9 bằng replacement
  s = s.replace(/[^a-zA-Z0-9]+/g, replacement);

  // gộp nhiều replacement liền nhau
  const repEsc = replacement.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const multiRep = new RegExp(`${repEsc}{2,}`, 'g');
  s = s.replace(multiRep, replacement);

  if (trim) {
    const edgeRep = new RegExp(`^${repEsc}|${repEsc}$`, 'g');
    s = s.replace(edgeRep, '');
  }

  if (lower) s = s.toLowerCase();
  if (maxLength && maxLength > 0) s = s.slice(0, maxLength);

  return s;
}
