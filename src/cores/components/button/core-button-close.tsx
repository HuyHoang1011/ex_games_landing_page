import { type MouseEvent } from 'react';

import CoreButton from '@/cores/components/button/core-button';
import { cn } from '@/cores/shadcn/lib/utils';

interface Props {
  onClick: (e?: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon' | null;
  icon?: string;
  variant?: 'outline' | 'solid'; // ? props riêng ko phải shadcn
  isLoading?: boolean;
}

export default function CoreButtonClick({
  onClick,
  className,
  size = 'icon',
  icon = 'X',
  variant = 'solid',
  isLoading = false,
}: Readonly<Props>) {
  return (
    <CoreButton
      autoFocus={false}
      type='button'
      variant='active-danger'
      icon={icon}
      onClick={onClick}
      className={cn(
        'p-0 size-7',
        size === 'sm' ? 'size-5 rounded-full' : '',
        variant === 'outline' ? 'bg-transparent border-none shadow-none' : '',
        className,
      )}
      isLoading={isLoading}
      size={size}
    />
  );
}
