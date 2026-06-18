'use client';

import Link from 'next/link';
import { Minus, Plus } from 'lucide-react';

import useBagStore from '@/modules/bag/stores/use-bag.store';
import { type BagEntry } from '@/modules/bag/utils/bag.util';
import { formatBookPrice } from '@/page-components/shared/utils/book.util';

type BagItemCardProps = {
  entry: BagEntry;
};

export default function BagItemCard({ entry }: Readonly<BagItemCardProps>) {
  const removeItem = useBagStore(state => state.removeItem);
  const incrementQuantity = useBagStore(state => state.incrementQuantity);
  const decrementQuantity = useBagStore(state => state.decrementQuantity);

  return (
    <article className='flex gap-5 rounded-2xl border border-[#ece4d8] bg-white p-5 shadow-[0_8px_24px_rgba(44,36,32,0.06)]'>
      <Link
        href={`/books/${entry.book.slug}`}
        className='block w-24 shrink-0 overflow-hidden rounded-xl sm:w-28'
      >
        <div
          className='flex aspect-[3/4] flex-col justify-end p-3 text-white'
          style={{ backgroundColor: entry.book.coverColor }}
        >
          <p className='font-serif text-xs font-semibold leading-tight'>{entry.book.title}</p>
        </div>
      </Link>

      <div className='flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center'>
        <div className='min-w-0'>
          <Link href={`/books/${entry.book.slug}`} className='block transition hover:opacity-80'>
            <h2 className='font-serif text-xl font-semibold text-landing-brown-dark'>{entry.book.title}</h2>
            <p className='mt-1 text-sm text-[#7a7064]'>{entry.book.author}</p>
          </Link>
          <button
            type='button'
            onClick={() => removeItem(entry.bookId)}
            className='mt-3 text-sm text-[#c45c4a] transition hover:text-[#a94435]'
          >
            Remove
          </button>
        </div>

        <div className='flex items-center justify-between gap-6 sm:justify-end'>
          <div className='inline-flex items-center rounded-full border border-[#ddd4c8] bg-[#f3ece2]'>
            <button
              type='button'
              onClick={() => decrementQuantity(entry.bookId)}
              className='flex size-9 items-center justify-center text-landing-brown-dark transition hover:bg-[#e8dfd3]'
              aria-label='Decrease quantity'
            >
              <Minus className='size-4' />
            </button>
            <span className='min-w-8 text-center text-sm font-medium text-landing-brown-dark'>{entry.quantity}</span>
            <button
              type='button'
              onClick={() => incrementQuantity(entry.bookId)}
              className='flex size-9 items-center justify-center text-landing-brown-dark transition hover:bg-[#e8dfd3]'
              aria-label='Increase quantity'
            >
              <Plus className='size-4' />
            </button>
          </div>

          <p className='min-w-20 text-right font-serif text-xl font-semibold text-landing-brown-dark'>
            {formatBookPrice(entry.lineTotal)}
          </p>
        </div>
      </div>
    </article>
  );
}
