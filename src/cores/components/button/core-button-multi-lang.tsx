'use client';

import Cookies from 'js-cookie';
import map from 'lodash/map';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useState } from 'react';

import CoreImage from '@/cores/components/images/core-image';
import { CORE_SETTING } from '@/cores/configs/core-setting.config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/cores/shadcn/components/ui/dropdown-menu';
import { getImageUrl } from '@/cores/utils/core-image.util';
import useI18n from '@/i18n/hooks/use-i18n.hook';
import { localeListLanguage, type LocaleType } from '@/i18n/types/language.type';

// Flag icons (you can use SVG or emoji)
const FlagIcons = {
  vi: (
    <CoreImage
      src={getImageUrl('/assets/images/flags/flag-vi.webp')}
      alt='flag-vi'
      parentClassName='size-7.25 md:size-10'
    />
  ),
  en: (
    <CoreImage
      src={getImageUrl('/assets/images/flags/flag-en.webp')}
      alt='flag-en'
      parentClassName='size-7.25 md:size-10'
    />
  ),
};

interface Props {
  isShowFlag?: boolean;
}

export default function CoreButtonMultiLang({ isShowFlag = true }: Readonly<Props>) {
  const router = useRouter();
  const currentLocale = useLocale() as LocaleType;
  const [selectedFlag, setSelectedFlag] = useState(FlagIcons[currentLocale]);
  const { tLanguage } = useI18n();

  const handleSwitchLang = (lang: LocaleType) => {
    Cookies.set(CORE_SETTING.LOCALE, lang, { path: '/' });
    setSelectedFlag(FlagIcons[lang]);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center gap-1 cursor-pointer outline-none rounded-full'>
        {/* <Languages className='w-4 text-primary' /> */}
        {isShowFlag && selectedFlag}
        <ChevronDown className='w-4 text-primary' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {map(localeListLanguage, item => (
          <DropdownMenuItem
            key={item.value}
            className='flex items-center gap-2'
            onClick={() => currentLocale !== item.value && handleSwitchLang(item.value)}
          >
            {FlagIcons[item.value as keyof typeof FlagIcons]}
            <span>{tLanguage(item.value)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
