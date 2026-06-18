import { Heart, Star } from 'lucide-react';

import AddToBagButton from '@/modules/bag/components/add-to-bag-button';
import { type Book } from '@/page-components/shared/constants/books.data';
import { formatBookPrice, getCategoryLabel } from '@/page-components/shared/utils/book.util';

type BookDetailHeroProps = {
  book: Book;
};

const SPECS = [
  { label: 'FORMAT', key: 'format' },
  { label: 'PAGES', key: 'pages' },
  { label: 'PUBLISHED', key: 'publishedYear' },
  { label: 'PUBLISHER', key: 'publisher' },
  { label: 'LANGUAGE', key: 'language' },
  { label: 'ISBN', key: 'isbn' },
] as const;

export default function BookDetailHero({ book }: Readonly<BookDetailHeroProps>) {
  return (
    <section className='mt-8 grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-14'>
      <div
        className='flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl p-6 text-white shadow-[0_24px_48px_rgba(44,36,32,0.18)]'
        style={{ backgroundColor: book.coverColor }}
      >
        <div className='font-serif leading-snug'>
          <p className='text-2xl font-semibold md:text-3xl'>{book.title}</p>
          <p className='mt-3 text-base text-white/85'>{book.author}</p>
        </div>
      </div>

      <div>
        <span className='inline-block rounded-md border border-[#ddd4c8] bg-[#f3ece2] px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#7a7064]'>
          {getCategoryLabel(book.category)}
        </span>

        <h1 className='mt-4 font-serif text-4xl font-semibold text-landing-brown-dark md:text-5xl'>{book.title}</h1>
        <p className='mt-3 font-serif text-lg text-[#7a7064]'>by {book.author}</p>

        <div className='mt-4 flex flex-wrap items-center gap-2 text-sm text-[#7a7064]'>
          <div className='flex items-center gap-1.5'>
            <Star className='size-4 fill-landing-badge text-landing-badge' />
            <span className='font-medium text-landing-brown-dark'>{book.rating.toFixed(1)}</span>
          </div>
          <span>·</span>
          <span>{book.pages} pages</span>
          <span>·</span>
          <span>{book.publishedYear}</span>
        </div>

        <div className='mt-5 flex items-baseline gap-3'>
          <span className='text-3xl font-semibold text-[#8b4a3c]'>{formatBookPrice(book.price)}</span>
          {book.originalPrice ? (
            <span className='text-lg text-[#a39a8f] line-through'>{formatBookPrice(book.originalPrice)}</span>
          ) : null}
        </div>

        <p className='mt-6 max-w-xl text-base leading-7 text-[#5c5349]'>{book.description}</p>

        <div className='mt-8 flex flex-wrap gap-3'>
          <AddToBagButton bookId={book.id} price={book.price} />
          <button
            type='button'
            className='inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#cfc4b6] bg-transparent px-6 text-sm font-medium text-landing-brown-dark transition hover:border-landing-brown'
          >
            <Heart className='size-4' />
            Wishlist
          </button>
        </div>

        <dl className='mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-[#e8dfd3] pt-8 sm:grid-cols-3'>
          {SPECS.map(spec => (
            <div key={spec.label}>
              <dt className='text-[11px] font-semibold tracking-[0.14em] text-[#a39a8f]'>{spec.label}</dt>
              <dd className='mt-1.5 text-sm font-medium text-landing-brown-dark'>
                {String(book[spec.key as keyof Book])}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
