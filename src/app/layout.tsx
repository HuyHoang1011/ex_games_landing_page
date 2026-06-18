import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { getLocale, getMessages } from 'next-intl/server';

import { CORE_ENV } from '@/cores/configs/core-env.config';
import { cn } from '@/cores/shadcn/lib/utils';
import { NextIntlProvider } from '@/i18n/providers/next-intl-provider';

import '../cores/styles/css/landing-main.css';

const fontInter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const fontPlayfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  applicationName: 'Pages & Co.',
  title: {
    default: 'Pages & Co. - Bookshop',
    template: '%s | Pages & Co.',
  },
  description: 'Pages & Co. is a curated bookshop for fiction, mystery, children, and poetry.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(fontInter.variable, fontPlayfair.variable, 'font-sans antialiased')}>
        <NextIntlProvider locale={locale} messages={messages} timeZone={CORE_ENV.APP.TIMEZONE} now={new Date()}>
          {children}
        </NextIntlProvider>
      </body>
    </html>
  );
}
