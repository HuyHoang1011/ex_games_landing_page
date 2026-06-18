'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/cores/shadcn/lib/utils';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-app-gray-bold',
);

interface Props extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>, VariantProps<typeof labelVariants> {
  label: string;
  isRequired?: boolean;
  subLabel?: string;
}

const CoreLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, Props>(
  ({ className, label, isRequired, subLabel, ...props }, ref) => {
    const fontSize = 'font-[400]';
    return (
      <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className, fontSize)} {...props}>
        {isRequired && <span className='mr-1 text-red-500'>*</span>}
        {label} {subLabel && <span className='text-gray-500'>{subLabel}</span>}
      </LabelPrimitive.Root>
    );
  },
);

CoreLabel.displayName = LabelPrimitive.Root.displayName;

export default CoreLabel;
