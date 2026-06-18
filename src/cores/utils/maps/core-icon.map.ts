import { BellRing, CircleAlert, CircleCheck, CircleHelp, CirclePlus } from 'lucide-react';

import { type ButtonVariantType } from '@/cores/shadcn/components/ui/button';
import { type CoreButtonActionType } from '@/cores/types/core-theme.type';

export function getButtonIconStyles(buttonType: CoreButtonActionType) {
  const defaultClassName = 'mr-2 size-4';

  switch (buttonType) {
    case 'create':
      return `${defaultClassName} text-success`;
    case 'update':
    case 'read':
      return `${defaultClassName} text-info`;
    case 'delete':
      return `${defaultClassName} text-danger`;
    default:
      return defaultClassName;
  }
}

export const mapAlertIcons: Record<ButtonVariantType, React.ElementType> = {
  danger: CircleHelp,
  info: BellRing,
  warning: CircleAlert,
  success: CircleCheck,
  custom: CirclePlus,
  link: CirclePlus,
  destructive: CircleHelp,
  secondary: CirclePlus,
  default: CirclePlus,
  'primary-light': CirclePlus,
  outline: CirclePlus,
  'outline-red': CirclePlus,
  'dark-linear': CirclePlus,
  ghost: CirclePlus,
  'active-danger': CirclePlus,
  'active-info': CirclePlus,
  'active-warning': CirclePlus,
  'active-success': CirclePlus,
  'active-danger-bold': CirclePlus,
  'active-info-bold': CirclePlus,
  'active-warning-bold': CirclePlus,
  'active-success-bold': CirclePlus,
  yellow: CirclePlus,
  'default-not-active': CirclePlus,
  orange: CirclePlus,
  'yellow-not-active': CirclePlus,
};

export const mapAlertClassNames: Record<ButtonVariantType, string> = {
  danger: 'text-danger stroke-danger bg-danger-light',
  info: 'text-info stroke-info bg-info-light',
  warning: 'text-warning stroke-warning bg-warning-light',
  success: 'text-success stroke-success bg-success-light',
  // ? Để tạm chưa sử dụng
  default: 'text-primary stroke-primary',
  'default-not-active': 'text-primary stroke-primary',
  'primary-light': 'text-primary-light stroke-primary-light',
  outline: 'text-primary stroke-primary',
  ghost: 'text-primary stroke-primary',
  custom: 'text-primary stroke-primary',
  destructive: 'text-primary stroke-primary',
  secondary: 'text-primary stroke-primary',
  link: 'text-primary stroke-primary',
  'dark-linear': 'text-primary stroke-primary',
  'outline-red': 'text-primary stroke-primary',
  'active-danger': 'text-primary stroke-primary',
  'active-info': 'text-primary stroke-primary',
  'active-warning': 'text-primary stroke-primary',
  'active-success': 'text-primary stroke-primary',
  'active-danger-bold': 'text-primary stroke-primary',
  'active-info-bold': 'text-primary stroke-primary',
  'active-warning-bold': 'text-primary stroke-primary',
  'active-success-bold': 'text-primary stroke-primary',
  yellow: 'text-yellow-500 stroke-yellow-500',
  orange: 'text-orange-500 stroke-orange-500',
  'yellow-not-active': 'text-yellow-400 stroke-yellow-400',
};
