import { cn } from '@/cores/shadcn/lib/utils';
import { tsStatusMap } from '@/cores/utils/maps/core-ts-status.map';
import { useI18nTheSport } from '@/i18n/hooks/use-i18n.hook';
import { type TranslationTheSportType } from '@/i18n/types/language.type';

interface Props {
  status: string;
}

export function TsStatusBadge({ status }: Readonly<Props>) {
  const { tTheSport } = useI18nTheSport();
  const { color } = tsStatusMap({ status });

  return (
    <span className={cn('inline-flex items-center px-2 py-1 rounded-md border text-xs text-nowrap', color)}>
      {tTheSport(status as TranslationTheSportType)}
    </span>
  );
}
