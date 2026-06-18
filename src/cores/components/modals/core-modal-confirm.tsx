'use client';
import { type ReactNode } from 'react';

import CoreDivider from '@/cores/components/commons/core-divider';
import CoreHeading from '@/cores/components/heading/core-heading';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/cores/shadcn/components/ui/alert-dialog';
import { type ButtonVariantType } from '@/cores/shadcn/components/ui/button';
import { cn } from '@/cores/shadcn/lib/utils';
import { mapAlertClassNames, mapAlertIcons } from '@/cores/utils/maps/core-icon.map';
import useI18n from '@/i18n/hooks/use-i18n.hook';

export interface ICoreModal {
  title?: string;
  subTitle?: string;
  subTitle2?: string;
  open: boolean;
  isLoading?: boolean;
  children?: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
}

interface Props extends ICoreModal {
  type?: ButtonVariantType;
}

export default function CoreModalConfirm({
  title,
  subTitle,
  subTitle2,
  open,
  onClose,
  onConfirm,
  type,
}: Readonly<Props>) {
  const { tAction } = useI18n();
  const Icon = mapAlertIcons[type ?? 'info'];

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className='max-w-[90%] md:w-[50%] lg:w-[40%] p-0 gap-0 border-0'>
        <AlertDialogTitle />
        {title && (
          <div className='sticky top-0 z-20 flex justify-center items-center gap-x-2 py-1 border-b border-app-gray text-app-info-light bg-app-info rounded-t-md'>
            <CoreHeading title={title} type='h3' className='!mb-0 font-primary font-bold text-primary' />
          </div>
        )}
        <AlertDialogDescription className='h-0' />
        <div className='p-3'>
          {subTitle && (
            <div className={'flex items-center gap-4 relative'}>
              <div className='flex items-center justify-center text-app-primary'>
                <Icon className={cn('size-16 rounded-full stroke-1', mapAlertClassNames[type ?? 'info'])} />
              </div>
              <div>
                <span
                  className={cn(
                    'font-bold text-xl flex items-center text-primary',
                    subTitle2 ? 'justify-start' : 'h-[50px] justify-center',
                  )}
                >
                  {subTitle}
                </span>
                {subTitle2 && <span className='text-primary'>{subTitle2}</span>}
              </div>
            </div>
          )}
          <CoreDivider className='my-3' />
          <AlertDialogFooter className='justify-between sm:justify-between items-center flex-row'>
            <AlertDialogAction className={''} onClick={onConfirm}>
              {tAction('confirm')}
            </AlertDialogAction>
            <AlertDialogCancel className='mt-0'>{tAction('cancel')}</AlertDialogCancel>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
