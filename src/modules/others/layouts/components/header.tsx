'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/cores/shadcn/lib/utils';
import { checkActiveRouter, parseHref } from '@/cores/utils/core-router.util';
import { useAuthStatus } from '@/modules/auth/hooks/use-auth.hook';
import useAuthStore from '@/modules/auth/stores/use-auth.store';
import useAuthModalStore from '@/modules/auth/stores/use-auth-modal.store';
import { useBagLineCount } from '@/modules/bag/hooks/use-bag-count.hook';
import { HEADER_NAV_ITEMS } from '@/modules/others/layouts/constants/header-nav.constant';
import { HEADER_HEIGHT } from '@/modules/others/layouts/constants/header.constant';

export default function Header() {
  const pathname = usePathname();
  const bagLineCount = useBagLineCount();
  const authStatus = useAuthStatus();
  const openLogin = useAuthModalStore(state => state.openLogin);
  const logout = useAuthStore(state => state.logout);

  return (
    <header
      className='flex w-full items-center gap-6 border-b border-[#e8dfd3] bg-landing-cream'
      style={{ height: HEADER_HEIGHT }}
    >
      <Link href='/' className='flex shrink-0 items-center gap-2.5'>
        <span className='flex size-9 items-center justify-center rounded-full bg-landing-brown text-sm font-semibold text-white'>
          P
        </span>
        <span className='font-serif text-xl font-semibold tracking-tight text-landing-brown-dark'>Pages & Co.</span>
      </Link>

      <nav className='hidden items-center gap-6 lg:flex'>
        {HEADER_NAV_ITEMS.map(item => {
          const isActive = checkActiveRouter(pathname, item.href);

          return (
            <Link
              key={item.title}
              href={parseHref(item.href)}
              className={cn(
                'text-sm font-medium text-[#4a4a4a] transition-colors hover:text-landing-brown-dark',
                isActive && 'border-b-2 border-landing-brown pb-0.5 text-landing-brown-dark',
              )}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className='ml-auto flex items-center gap-3'>
        <label className='relative hidden md:block'>
          <Search className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#9a9a9a]' />
          <input
            type='search'
            placeholder='Search titles, authors...'
            className='h-10 w-56 rounded-full border border-transparent bg-white/80 pr-4 pl-9 text-sm text-[#333] outline-none placeholder:text-[#9a9a9a] focus:border-[#d8cfc2] lg:w-72 xl:w-96'
          />
        </label>

        {authStatus === 'authenticated' ? (
          <button
            type='button'
            onClick={logout}
            className='hidden h-10 items-center justify-center rounded-full border border-landing-brown-dark px-5 text-sm font-medium leading-none text-landing-brown-dark sm:inline-flex'
          >
            Sign out
          </button>
        ) : authStatus === 'unauthenticated' ? (
          <button
            type='button'
            onClick={() => openLogin()}
            className='hidden h-10 items-center justify-center rounded-full border border-landing-brown-dark px-5 text-sm font-medium leading-none text-landing-brown-dark sm:inline-flex'
          >
            Sign in
          </button>
        ) : null}

        {authStatus === 'authenticated' ? (
          <Link
            href='/bag'
            className='inline-flex h-10 items-center gap-2 rounded-full bg-landing-brown-dark px-4 text-sm font-medium text-white'
          >
            Bag
            <span className='flex size-5 items-center justify-center rounded-full bg-landing-badge text-xs font-semibold text-landing-brown-dark'>
              {bagLineCount}
            </span>
          </Link>
        ) : null}
      </div>
    </header>
  );
}
