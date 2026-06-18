'use client';

import { Dialog, DialogContent } from '@/cores/shadcn/components/ui/dialog';
import LoginForm from '@/modules/auth/components/login-form';
import RegisterForm from '@/modules/auth/components/register-form';
import useAuthModalStore from '@/modules/auth/stores/use-auth-modal.store';

export default function AuthModal() {
  const isOpen = useAuthModalStore(state => state.isOpen);
  const view = useAuthModalStore(state => state.view);
  const close = useAuthModalStore(state => state.close);

  const isLogin = view === 'login';

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && close()}>
      <DialogContent
        showCloseButton
        className='max-w-md rounded-2xl border-0 bg-[#f7f3eb] p-8 shadow-[0_24px_48px_rgba(44,36,32,0.16)] sm:max-w-md'
      >
        <div className='pr-6'>
          <span className='flex size-9 items-center justify-center rounded-full bg-[#8b4538] text-sm font-semibold text-white'>
            P
          </span>

          <h2 className='mt-5 font-serif text-3xl font-semibold text-landing-brown-dark'>
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className='mt-2 text-sm leading-6 text-[#7a7064]'>
            {isLogin
              ? 'Sign in to access your bag, orders and wishlist.'
              : 'Join Pages & Co. to save your bag, orders and wishlist.'}
          </p>
        </div>

        <div className='mt-2'>{isLogin ? <LoginForm /> : <RegisterForm />}</div>
      </DialogContent>
    </Dialog>
  );
}
