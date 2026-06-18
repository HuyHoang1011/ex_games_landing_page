'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Input } from '@/cores/shadcn/components/ui/input';
import useAuthStore from '@/modules/auth/stores/use-auth.store';
import useAuthModalStore from '@/modules/auth/stores/use-auth-modal.store';
import { runPendingAuthAction } from '@/modules/auth/utils/auth-pending-action.util';

export default function LoginForm() {
  const router = useRouter();
  const login = useAuthStore(state => state.login);
  const close = useAuthModalStore(state => state.close);
  const setView = useAuthModalStore(state => state.setView);
  const takePendingAction = useAuthModalStore(state => state.takePendingAction);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await login(email, password);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error ?? 'Unable to sign in.');
      return;
    }

    const pendingAction = takePendingAction();
    close();
    runPendingAuthAction(pendingAction, router);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <div className='space-y-2'>
        <label htmlFor='login-email' className='text-[11px] font-semibold tracking-[0.14em] text-[#5c5349] uppercase'>
          Email
        </label>
        <Input
          id='login-email'
          type='email'
          autoComplete='email'
          placeholder='user@gmail.com'
          value={email}
          onChange={event => setEmail(event.target.value)}
          className='h-11 rounded-lg border-[#ddd4c8] bg-white px-4 text-sm shadow-none focus-visible:border-[#cfc4b6] focus-visible:ring-0'
          required
        />
      </div>

      <div className='space-y-2'>
        <label
          htmlFor='login-password'
          className='text-[11px] font-semibold tracking-[0.14em] text-[#5c5349] uppercase'
        >
          Password
        </label>
        <Input
          id='login-password'
          type='password'
          autoComplete='current-password'
          placeholder='123456'
          value={password}
          onChange={event => setPassword(event.target.value)}
          className='h-11 rounded-lg border-[#ddd4c8] bg-white px-4 text-sm shadow-none focus-visible:border-[#cfc4b6] focus-visible:ring-0'
          required
        />
      </div>

      {error ? <p className='text-sm text-[#c45c4a]'>{error}</p> : null}

      <button
        type='submit'
        disabled={isSubmitting}
        className='inline-flex h-12 w-full items-center justify-center rounded-full bg-[#8b4538] text-sm font-semibold text-white transition hover:bg-[#7a3c31] disabled:cursor-not-allowed disabled:opacity-70'
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>

      <p className='pt-1 text-center text-sm text-[#8a7f72]'>
        New here?{' '}
        <button
          type='button'
          onClick={() => setView('register')}
          className='font-medium text-[#8b4538] transition hover:text-[#7a3c31]'
        >
          Create an account
        </button>
      </p>
    </form>
  );
}
