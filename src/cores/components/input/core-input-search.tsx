'use client';

import { Search, X } from 'lucide-react';
import * as React from 'react';

import { Input } from '@/cores/shadcn/components/ui/input';
import { cn } from '@/cores/shadcn/lib/utils';

export interface CoreInputSearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  parentClassName?: string;
}

export const CoreInputSearch = React.forwardRef<HTMLInputElement, CoreInputSearchProps>(
  ({ value, onChange, onClear, placeholder = 'Search...', className, parentClassName, ...props }, ref) => {
    const showClear = !!value;

    return (
      <div className={cn('relative w-full max-w-xs', parentClassName)}>
        {/* Icon search bên trái */}
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4 pointer-events-none' />
        {/* Input Search */}
        <Input
          ref={ref}
          type='text'
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn('pl-9 pr-9', className)}
          {...props}
        />
        {/* Icon clear bên phải */}
        {showClear && (
          <button
            type='button'
            aria-label='Xoá tìm kiếm'
            onClick={onClear}
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all duration-200',
              'hover:scale-110 hover:bg-destructive/10 hover:text-destructive',
              'active:scale-95',
            )}
          >
            <X className='size-4' />
          </button>
        )}
      </div>
    );
  },
);

CoreInputSearch.displayName = 'CoreInputSearch';
