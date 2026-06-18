import { cn } from '@/cores/shadcn/lib/utils';
import { statusMap } from '@/cores/utils/maps/core-status.map';
import useI18n from '@/i18n/hooks/use-i18n.hook';
import { type TranslationFormType } from '@/i18n/types/language.type';

interface Props {
  status: string;
}

export function StatusBadge({ status }: Readonly<Props>) {
  const { tForm } = useI18n();
  const { color } = statusMap({ status });

  return (
    <span className={cn('inline-flex items-center px-2 py-1 rounded-md border text-xs', color)}>
      {tForm(status as TranslationFormType)}
    </span>
  );
}
