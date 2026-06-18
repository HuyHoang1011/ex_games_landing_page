import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';

import { cn } from '@/cores/shadcn/lib/utils';
import { type ICoreButton } from '@/cores/types/core-theme.type';
import useI18n from '@/i18n/hooks/use-i18n.hook';

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-linear-to-l from-primary to-primary-light hover:opacity-70 transition-all text-white shadow-xs',
        'primary-light': 'bg-primary-light hover:opacity-70 transition-all text-white shadow-xs',
        'default-not-active':
          'bg-linear-to-b bg-white hover:from-primary hover:to-primary-light border solid border-[#000] hover:border-none transition-all text-[#000] hover:border-none hover:text-white text-base leading-tight',
        custom: '',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        success:
          'border border-input bg-background hover:border-success-bold hover:bg-success-light hover:text-success',
        'active-success':
          'border border-input border-success-bold bg-success-light text-success hover:bg-success-bold hover:text-white',
        'active-success-bold':
          'border border-input border-success-bold bg-success-bold text-white hover:bg-success-light hover:text-success',
        info: 'border border-input bg-background hover:border-info-bold hover:bg-info-light hover:text-info',
        'active-info':
          'border border-input border-info-bold bg-info-light text-info hover:bg-info-bold hover:text-white',
        'active-info-bold':
          'border border-input border-info-bold bg-info-bold text-white hover:bg-info-light hover:text-info',
        warning:
          'border border-input bg-background hover:border-warning-bold hover:bg-warning-light hover:text-warning',
        'active-warning':
          'border border-input border-warning-bold bg-warning-light text-warning hover:bg-warning-bold hover:text-white',
        'active-warning-bold':
          'border border-input border-warning-bold bg-warning-bold text-white hover:bg-warning-light hover:text-warning',
        danger: 'border border-input bg-background hover:border-danger-bold hover:bg-danger-light hover:text-danger',
        'active-danger':
          'border border-input border-danger-bold bg-danger-light text-danger hover:bg-danger-bold hover:text-white',
        'active-danger-bold':
          'border border-input border-danger-bold bg-danger-bold text-white hover:bg-danger-light hover:text-danger',
        'dark-linear':
          'bg-linear-to-b from-[#343434] to-[#000000] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),inset_0px_3px_7px_0px_rgba(255,255,255,0.7)] hover:from-[#444444] hover:to-[#111111] transition-all text-white font-extrabold text-base leading-tight',
        'outline-red':
          'bg-linear-to-b bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),inset_0px_3px_7px_0px_rgba(255,255,255,0.7)] hover:from-[#444444] hover:to-[#111111] border solid border-[#DE0000] transition-all text-[#DE0000] hover:text-white hover:border-none font-extrabold text-base leading-tight',
        yellow: 'bg-linear-to-b from-[#FFDD00] to-[#FF9000] hover:opacity-70 transition-all text-black shadow-xs',
        'yellow-not-active':
          'bg-linear-to-b bg-white hover:from-[#FFDD00] hover:to-[#FF9000] border solid border-[#000] hover:border-none transition-all text-[#000] hover:border-none text-base leading-tight',
        orange: 'bg-linear-to-b from-[#FFCC00] to-[#FF6600] hover:opacity-70 transition-all text-black shadow-xs',
      },
      size: {
        default: 'h-7 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        dark: 'h-7 px-6 py-4 has-[>svg]:px-3',
      },
      animation: {
        default: '',
        'bounce-to-top': 'hover:-translate-y-1 hover:shadow-xl',
        'shimmer-left': cn(
          'relative overflow-hidden transition-all duration-3 00',
          'before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-white/40 before:to-transparent',
          'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500',
        ),
        'neon-glow': cn(
          'relative transition-all duration-300',
          'text-white drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]',
          'hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.6)] hover:shadow-[0_0_12px_rgba(0,255,255,0.4)]',
          'hover:scale-105',
        ),
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  animation,
  asChild = false,
  isLoading = false,
  ...props
}: Readonly<ICoreButton>) {
  const Comp = asChild ? Slot : 'button';
  const { tGeneral } = useI18n();
  const isSizeIcon = size === 'icon';
  const disabled = props.disabled;

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size, className, animation }),
        disabled ? 'cursor-default text-gray-500 hover:bg-transparent hover:text-gray-500 hover:shadow-none' : '',
      )}
      disabled={disabled || isLoading} // ? Custom
      {...props}
    >
      {isLoading ? (
        <>
          <LoaderCircle className={cn('h-4 w-4 animate-spin', isSizeIcon ? '' : 'mr-2')} />
          {isSizeIcon ? null : tGeneral('processing')}
        </>
      ) : (
        props.children
      )}
    </Comp>
  );
}

export type ButtonVariantType = NonNullable<VariantProps<typeof buttonVariants>['variant']>;

export { Button, buttonVariants };
