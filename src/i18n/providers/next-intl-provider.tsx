'use client';

import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import { type ReactNode } from 'react';

type NextIntlProviderProps = {
  messages: AbstractIntlMessages;
  locale: string;
  children: ReactNode;
  now: Date;
  timeZone: string;
};

export const NextIntlProvider = ({ messages, locale, children, now, timeZone }: NextIntlProviderProps) => {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} now={now} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  );
};
