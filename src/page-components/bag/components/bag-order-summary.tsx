'use client';

import { formatBookPrice } from '@/page-components/shared/utils/book.util';

type BagOrderSummaryProps = {
  itemCount: number;
  subtotal: number;
};

export default function BagOrderSummary({ itemCount, subtotal }: Readonly<BagOrderSummaryProps>) {
  return (
    <aside className='rounded-2xl border border-[#ece4d8] bg-white p-6 shadow-[0_8px_24px_rgba(44,36,32,0.06)]'>
      <h2 className='font-serif text-2xl font-semibold text-landing-brown-dark'>Order summary</h2>

      <div className='mt-6 space-y-3 text-sm text-[#5c5349]'>
        <div className='flex items-center justify-between'>
          <span>
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </span>
          <span className='font-medium text-landing-brown-dark'>{formatBookPrice(subtotal)}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Shipping</span>
          <span className='font-medium text-landing-brown-dark'>Free</span>
        </div>
      </div>

      <div className='mt-5 flex items-center justify-between border-t border-[#e8dfd3] pt-5'>
        <span className='font-serif text-2xl font-semibold text-landing-brown-dark'>Total</span>
        <span className='font-serif text-2xl font-semibold text-landing-badge'>{formatBookPrice(subtotal)}</span>
      </div>

      <button
        type='button'
        className='mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-landing-brown-dark text-sm font-semibold text-white transition hover:bg-landing-brown'
      >
        Checkout
      </button>

      <p className='mt-4 text-center text-xs text-[#8a7f72]'>You&apos;ll be asked to sign in to complete your order.</p>
    </aside>
  );
}
