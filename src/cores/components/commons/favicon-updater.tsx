'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export function FaviconUpdater() {
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const actualTheme = theme === 'system' ? systemTheme : theme;

    let faviconLink = document.querySelector("link[rel='icon']") as HTMLLinkElement;

    if (!faviconLink) {
      faviconLink = document.createElement('link');
      faviconLink.rel = 'icon';
      document.head.appendChild(faviconLink);
    }

    if (actualTheme === 'dark') {
      faviconLink.href = '/assets/images/abc1tv/favicon-dark.png';
    } else {
      faviconLink.href = '/assets/images/abc1tv/favicon-light.png';
    }
  }, [theme, systemTheme]);

  return null;
}
