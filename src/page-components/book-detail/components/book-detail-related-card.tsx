import Link from 'next/link';
import { Star } from 'lucide-react';

import { type Book } from '@/page-components/shared/constants/books.data';
import { formatBookPrice } from '@/page-components/shared/utils/book.util';

type BookDetailRelatedCardProps = {
  book: Book;
};

export default function BookDetailRelatedCard({ book }: Readonly<BookDetailRelatedCardProps>) {
  return (
    <Link href={`/books/${book.slug}`} className='group block'>
      <div
        className='flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl p-4 text-white transition group-hover:opacity-95'
        style={{ backgroundColor: book.coverColor }}
      >
        <div className='text-sm leading-snug'>
          <p className='font-semibold'>{book.title}</p>
          <p className='mt-1 text-xs text-white/80'>{book.author}</p>
        </div>
      </div>
      <div className='mt-3'>
        <h3 className='text-sm font-semibold text-landing-brown-dark'>{book.title}</h3>
        <p className='mt-1 text-sm text-[#7a7064]'>{book.author}</p>
        <div className='mt-2 flex items-center justify-between gap-2'>
          <span className='text-sm font-semibold text-landing-brown-dark'>{formatBookPrice(book.price)}</span>
          <div className='flex items-center gap-1 text-sm text-[#7a7064]'>
            <Star className='size-3.5 fill-landing-badge text-landing-badge' />
            <span>{book.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
