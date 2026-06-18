export function stripHtml(html: string) {
  return String(html ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function removeDiacritics(input: string) {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export function clampText(input: string, max = 155) {
  if (!input) return '';
  const s = input.trim();
  if (s.length <= max) return s;
  // ưu tiên cắt theo dấu chấm/câu
  const cut = s.slice(0, max + 1);
  const lastDot = cut.lastIndexOf('.');
  const lastSpace = cut.lastIndexOf(' ');
  if (lastDot > 40) return cut.slice(0, lastDot).trim();
  return cut.slice(0, Math.max(0, lastSpace)).trim();
}

const STOPWORDS = new Set([
  // vi (rút gọn)
  'và',
  'hoặc',
  'là',
  'của',
  'cho',
  'với',
  'một',
  'những',
  'các',
  'được',
  'trong',
  'khi',
  'đến',
  'từ',
  'đã',
  'này',
  'kia',
  'đó',
  // en (rút gọn)
  'and',
  'or',
  'the',
  'a',
  'an',
  'of',
  'to',
  'for',
  'in',
  'on',
  'at',
  'by',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  'this',
  'that',
  'these',
  'those',
]);

export function extractKeywords(text: string, opts?: { max?: number }) {
  const plain = removeDiacritics(stripHtml(text)).toLowerCase();
  const tokens = plain.split(/[^a-z0-9]+/g).filter(Boolean);
  const freq = new Map<string, number>();
  for (const t of tokens) {
    if (t.length < 3) continue;
    if (STOPWORDS.has(t)) continue;
    freq.set(t, (freq.get(t) ?? 0) + 1);
  }
  const top = [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, opts?.max ?? 10)
    .map(([k]) => k);
  return [...new Set(top)].join(', ');
}
