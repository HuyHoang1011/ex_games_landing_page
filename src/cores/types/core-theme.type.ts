import { type VariantProps } from 'class-variance-authority';
import type LucideIcons from 'lucide-react';
import { type ReactNode } from 'react';

import { type buttonVariants } from '@/cores/shadcn/components/ui/button';

// ? START: THEME Types
export type ICoreButton = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    title?: string;
    titleClassName?: string;
    icon?: keyof typeof LucideIcons | ReactNode;
    iconType?: 'lucide' | 'svg';
    iconPosition?: 'left' | 'right';
    iconClassName?: string;
    isLoading?: boolean;
  };

export type CoreButtonActionType = 'create' | 'read' | 'update' | 'delete';
// ? END: THEME Types

// ? START: BLV Types
export type CommentatorSliderType = 'card-home-live' | 'card' | 'row';
// ? END: BLV Types
