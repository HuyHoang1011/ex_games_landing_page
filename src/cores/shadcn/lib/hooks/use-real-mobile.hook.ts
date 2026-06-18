export function isRealMobile() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || navigator.vendor;
  return /android|iphone|ipad|ipod|windows phone/i.test(ua);
}
