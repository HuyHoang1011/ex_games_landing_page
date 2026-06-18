import Link from 'next/link';

import { type Book } from '@/page-components/shared/constants/books.data';

type BookDetailBreadcrumbsProps = {
  book: Book;
};

export default function BookDetailBreadcrumbs({ book }: Readonly<BookDetailBreadcrumbsProps>) {
  return (
    <nav aria-label='Breadcrumb' className='text-sm text-[#8a7f72]'>
      <Link href='/' className='transition hover:text-landing-brown-dark'>
        Home
      </Link>
      <span className='mx-2'>/</span>
      <Link href='/shop-all' className='transition hover:text-landing-brown-dark'>
        Books
      </Link>
      <span className='mx-2'>/</span>
      <span className='text-landing-brown-dark'>{book.title}</span>
    </nav>
  );
}
