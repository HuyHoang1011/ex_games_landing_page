'use client';

import { useCallback, useEffect, useState } from 'react';

import { cn } from '@/cores/shadcn/lib/utils';

export default function CoreScrollToTop({ scrollRef }: { scrollRef: React.RefObject<HTMLElement | null> }) {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setShowScrollButton(el.scrollTop > 100);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef]);

  const scrollToTop = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollTo({ top: 0, behavior: 'smooth' });
  }, [scrollRef]);

  if (!showScrollButton) return null;

  return (
    <button
      className={cn(
        'tap-top text-center cursor-pointer size-10 rounded-full fixed bottom-14 right-3 bg-primary flex items-center justify-center z-80 animate-bounce transition-colors hover-content',
      )}
      onClick={scrollToTop}
      aria-label='Scroll to top'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='m18 15-6-6-6 6' />
      </svg>
    </button>
  );
}
