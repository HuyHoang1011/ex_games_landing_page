import * as React from 'react';

import { cn } from '@/cores/shadcn/lib/utils';

interface ProgressProps extends React.ComponentProps<'div'> {
  value?: number;
  max?: number;
}

function Progress({ className, value = 0, max = 100, ...props }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      data-slot='progress'
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
      {...props}
    >
      <div
        className='h-full w-full flex-1 bg-linear-to-r from-primary to-primary-light transition-all duration-300 ease-in-out'
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
}

export { Progress };
