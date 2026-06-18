'use client';

import CoreButtonClose from '@/cores/components/button/core-button-close';
import CoreDivider from '@/cores/components/commons/core-divider';
import { type ICoreModal } from '@/cores/components/modals/core-modal-confirm';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/cores/shadcn/components/ui/dialog';
import { cn } from '@/cores/shadcn/lib/utils';

interface Props extends ICoreModal {
  width?: string;
  height?: string;
  type?: 'default' | 'table';
}

export default function CoreModal({
  title,
  open,
  onClose,
  className,
  width = 'max-w-[90%] md:max-w-[60%] lg:max-w-[40%]',
  height = 'max-h-[80vh]',
  type = 'default',
  children,
}: Readonly<Props>) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className={cn(width, height, 'p-0 flex flex-col gap-0', className)}>
        {/* Header */}
        <div className={cn('cms-container shrink-0 flex justify-between items-center py-2')}>
          {title ? <DialogTitle className='text-center text-primary px-6'>{title}</DialogTitle> : <DialogTitle />}
          <div className=''>
            <CoreButtonClose onClick={onClose} />
          </div>
        </div>
        <CoreDivider />
        {/* Content */}
        <div className={cn(type === 'default' ? 'cms-container' : '', 'flex-1 overflow-y-auto', height)}>
          {children}
        </div>
        <DialogDescription className='hidden' />
      </DialogContent>
    </Dialog>
  );
}
