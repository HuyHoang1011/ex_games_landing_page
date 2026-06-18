import * as React from 'react';

import { cn } from '@/cores/shadcn/lib/utils';
import { CORE_THEME } from '@/cores/styles/constants/theme.constant';

function Textarea({ className, readOnly, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      readOnly={readOnly}
      className={cn(
        'border-input placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        readOnly ? CORE_THEME.FORM.readOnly : CORE_THEME.FORM.focus,
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
