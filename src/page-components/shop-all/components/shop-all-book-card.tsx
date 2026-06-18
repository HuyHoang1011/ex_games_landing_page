import Link from 'next/link';
import { Star } from 'lucide-react';

import { formatBookPrice } from '@/page-components/shared/utils/book.util';
import { type ShopAllBook } from '@/page-components/shop-all/constants/shop-all.data';

type ShopAllBookCardProps = {
  book: ShopAllBook;
};

export default function ShopAllBookCard({ book }: Readonly<ShopAllBookCardProps>) {
  return (
    <article>
      <Link href={`/books/${book.slug}`} className='group block'>
        <div
          className='relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl p-4 text-white transition group-hover:opacity-95'
          style={{ backgroundColor: book.coverColor }}
        >
          {book.tag === 'BESTSELLER' ? (
            <span className='absolute top-3 left-3 rounded-sm bg-landing-badge px-2 py-1 text-[10px] font-bold tracking-wide text-landing-brown-dark'>
              BESTSELLER
            </span>
          ) : null}
          {book.tag === 'NEW' ? (
            <span className='absolute top-3 right-3 rounded-sm bg-white px-2 py-1 text-[10px] font-bold tracking-wide text-landing-brown-dark'>
              NEW
            </span>
          ) : null}
          <div className='font-serif leading-snug'>
            <p className='text-lg font-semibold'>{book.title}</p>
            <p className='mt-2 text-sm text-white/85'>{book.author}</p>
          </div>
        </div>
      </Link>

      <div className='mt-3'>
        <Link href={`/books/${book.slug}`} className='block transition hover:opacity-80'>
          <h3 className='text-sm font-semibold text-landing-brown-dark'>{book.title}</h3>
          <p className='mt-1 text-sm text-[#7a7064]'>{book.author}</p>
        </Link>
        <div className='mt-2 flex items-center justify-between gap-2'>
          <div className='flex items-baseline gap-2'>
            <span className='text-sm font-semibold text-landing-brown-dark'>{formatBookPrice(book.price)}</span>
            {book.originalPrice ? (
              <span className='text-sm text-[#a39a8f] line-through'>{formatBookPrice(book.originalPrice)}</span>
            ) : null}
          </div>
          <div className='flex items-center gap-1 text-sm text-[#7a7064]'>
            <Star className='size-3.5 fill-landing-badge text-landing-badge' />
            <span>{book.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
