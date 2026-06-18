'use client';

import CoreButton from '@/cores/components/button/core-button';
import CoreImage from '@/cores/components/images/core-image';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/cores/shadcn/components/ui/dialog';
import { cn } from '@/cores/shadcn/lib/utils';
import useModalStore from '@/cores/stores/use-modal.store';
import { getImageUrl } from '@/cores/utils/core-image.util';

export default function RequestLogin() {
  const { isOpen, type, onClose, onOpen } = useModalStore();

  const open = isOpen && type === 'request-login';

  const handleClose = () => {
    onClose();
  };

  const handleLogin = () => {
    handleClose();
    // Mở modal đăng nhập
    onOpen('login');
  };

  if (!open) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          'max-w-[90%] md:max-w-[400px] gap-0 rounded-2xl overflow-hidden',
          'p-6 md:p-8 flex flex-col items-center',
        )}
      >
        <DialogTitle className='sr-only'>Yêu cầu đăng nhập</DialogTitle>
        <DialogDescription className='hidden' />

        {/* Logo với badge LIVE */}
        <div className='flex flex-col items-center mb-6'>
          <div className='relative flex items-center gap-2.5'>
            {/* Logo ABC VIP LIVE */}
            <CoreImage
              src={getImageUrl('/assets/images/logo/abc-vip-live.webp')}
              alt='ABC VIP LIVE Logo'
              type='custom'
              width={438}
              height={94}
              parentClassName='h-20 md:h-28 object-contain'
            />
          </div>
        </div>

        {/* Text yêu cầu đăng nhập */}
        <p className='text-base md:text-lg text-gray-800 text-center mb-8 font-medium'>
          Vui lòng đăng nhập để tiếp tục thao tác
        </p>

        {/* Button ĐĂNG NHẬP */}
        <CoreButton
          title='ĐĂNG NHẬP'
          onClick={handleLogin}
          variant='default'
          className={cn(
            'w-[170px] h-[40px] rounded-xl',
            'text-white font-bold text-base md:text-lg uppercase',
            'hover:opacity-90 transition-opacity',
            'shadow-lg',
          )}
          titleClassName='text-white'
        />
      </DialogContent>

      {/* Exit Icon */}
      {isOpen && (
        <button
          onClick={handleClose}
          className={cn(
            'fixed z-10001 pointer-events-auto',
            'cursor-pointer hover:opacity-80 transition-opacity',
            'flex items-center justify-center',
          )}
          aria-label='Đóng'
          style={{
            top: 'calc(50vh - 190px)',
            right: 'calc(50vw - 200px)',
          }}
        >
          <CoreImage
            src={getImageUrl('/assets/images/icons/svg/exit.svg')}
            alt='Exit'
            type='custom'
            width={44}
            height={44}
            parentClassName='size-11'
          />
        </button>
      )}
    </Dialog>
  );
}
