import { type HomeBook } from '@/page-components/home/constants/home.data';

type HomeBookCardProps = {
  book: HomeBook;
};

export default function HomeBookCard({ book }: Readonly<HomeBookCardProps>) {
  return (
    <article className='group'>
      <div
        className='relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl p-4 text-white'
        style={{ backgroundColor: book.coverColor }}
      >
        {book.tag ? (
          <span className='absolute top-3 left-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold tracking-wide text-landing-brown-dark'>
            {book.tag}
          </span>
        ) : null}
        <div className='text-sm leading-snug'>
          <p className='font-semibold'>{book.title}</p>
          <p className='mt-1 text-xs text-white/80'>{book.author}</p>
        </div>
      </div>
      <div className='mt-3'>
        <h3 className='text-sm font-semibold text-landing-brown-dark'>{book.title}</h3>
        <p className='mt-1 text-sm text-[#7a7064]'>{book.author}</p>
        <p className='mt-2 text-sm font-semibold text-landing-brown-dark'>{book.price}</p>
      </div>
    </article>
  );
}
