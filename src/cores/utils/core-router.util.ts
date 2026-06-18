type QueryParams = Record<string, string | number | boolean | null | undefined>;

export function parseHref(href?: string, query?: QueryParams): string {
  const path = href === '/' ? '/' : `/${href ?? ''}`;

  if (!query) return path;

  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') return;

    searchParams.set(key, String(value));
  });

  const queryString = searchParams.toString();

  return queryString ? `${path}?${queryString}` : path;
}

export function checkActiveRouter(pathname: string, href: string): boolean {
  const hrefPath = buildPath(href).replace(/\/$/, '') || '/';
  const currentPath = pathname.replace(/\/$/, '') || '/';

  return currentPath === hrefPath;
}

function buildPath(href: string): string {
  if (!href || href === '/') return '/';
  return href.startsWith('/') ? href : `/${href}`;
}
