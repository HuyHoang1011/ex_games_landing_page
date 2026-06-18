'use client';

import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon, X, XCircleIcon, type LucideIcon } from 'lucide-react';
import { useEffect } from 'react';

import {
  type CoreAlertType,
  useCoreAlertStore,
} from '@/cores/components/alert/stores/use-core-alert.store';
import { Button } from '@/cores/shadcn/components/ui/button';
import { cn } from '@/cores/shadcn/lib/utils';
import useModalStore from '@/cores/stores/use-modal.store';
import useI18n from '@/i18n/hooks/use-i18n.hook';

const iconMap: Record<CoreAlertType, LucideIcon> = {
  success: CheckCircle2Icon,
  info: InfoIcon,
  warning: AlertTriangleIcon,
  error: XCircleIcon,
};

const colorMap: Record<CoreAlertType, string> = {
  success: 'text-green-500',
  info: 'text-blue-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
};

const placementMap: Record<string, string> = {
  'top-left': 'top-0 left-0 items-start justify-start',
  'top-right': 'top-0 right-0 items-start justify-end',
  'bottom-left': 'bottom-0 left-0 items-end justify-start',
  'bottom-right': 'bottom-0 right-0 items-end justify-end',
  center: 'inset-0 items-center justify-center',
};

export default function CoreAlertPopup() {
  const { tAction } = useI18n();
  const { alert, close } = useCoreAlertStore();
  const { onCloseV2 } = useModalStore();

  useEffect(() => {
    if (alert?.duration && alert?.variant === 'toast') {
      const timer = setTimeout(() => {
        close();
      }, alert.duration);
      return () => clearTimeout(timer);
    }
  }, [alert, close]);

  if (!alert) return null;

  const alertType: CoreAlertType = alert.type;
  const Icon = iconMap[alertType];
  const placement = alert.placement || 'center';
  const isCenter = placement === 'center';
  const placementClass = placementMap[placement];

  // Animation classes based on placement
  const isTop = placement.startsWith('top');
  const isBottom = placement.startsWith('bottom');
  const animationClass = cn(
    'animate-in fade-in zoom-in-95 duration-300',
    isTop && 'slide-in-from-top-full',
    isBottom && 'slide-in-from-bottom-full',
    isCenter && 'zoom-in-95',
  );

  const handleConfirm = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    alert.onConfirm?.();
    close();
    // Gọi onCloseV2 để đóng modal khác (nhưng không đóng change-coin/change-point)
    onCloseV2();
  };

  const handleCancel = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    alert.onCancel?.();
    close();
    // Gọi onCloseV2 để đóng modal khác (nhưng không đóng change-coin/change-point)
    onCloseV2();
  };

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    close();
    // Gọi onCloseV2 để đóng modal khác (nhưng không đóng change-coin/change-point)
    onCloseV2();
  };

  return (
    <div
      className={cn('fixed z-[20000] flex', isCenter ? 'inset-0' : 'pointer-events-none', placementClass)}
      onClick={e => e.stopPropagation()}
    >
      {/* Overlay */}
      {isCenter && (
        <div
          className='absolute inset-0 bg-black/50 backdrop-blur-sm'
          onClick={e => {
            e.stopPropagation();
            handleClose();
          }}
        />
      )}

      {/* Popup */}
      <div
        className={cn(
          'relative z-10 w-full max-w-md rounded-xl bg-white shadow-xl pointer-events-auto',
          animationClass,
          !isCenter && 'm-6',
          alert.variant === 'confirm' ? 'p-6' : 'px-6 py-4',
        )}
      >
        {/* Close X */}
        <button onClick={handleClose} className='absolute right-4 top-4 text-muted-foreground hover:text-foreground'>
          <X className='h-5 w-5' />
        </button>

        {/* Icon & Title */}
        <div className='flex items-center gap-3 mb-2'>
          <Icon className={cn('h-6 w-6', colorMap[alertType])} />
          <h2 className='text-lg font-semibold'>{alert.title}</h2>
        </div>

        {/* Description */}
        {alert.description && <p className='text-sm text-muted-foreground'>{alert.description}</p>}

        {/* Actions */}
        <div className={cn('flex gap-4', alert.variant === 'confirm' ? 'mt-6 justify-between' : 'justify-end')}>
          {alert.variant === 'confirm' && (
            <Button onClick={handleConfirm} className='min-w-30'>
              {alert.confirmText || tAction('confirm')}
            </Button>
          )}
          <Button onClick={handleCancel} variant='outline' className='min-w-30'>
            {alert.cancelText || tAction('cancel')}
          </Button>
        </div>
      </div>
    </div>
  );
}
