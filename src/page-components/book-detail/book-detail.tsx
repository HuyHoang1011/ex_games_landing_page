import HomeFooter from '@/page-components/home/components/footer/home-footer';
import BookDetailBreadcrumbs from '@/page-components/book-detail/components/book-detail-breadcrumbs';
import BookDetailHero from '@/page-components/book-detail/components/book-detail-hero';
import BookDetailRelated from '@/page-components/book-detail/components/book-detail-related';
import { getRelatedBooks, type Book } from '@/page-components/shared/constants/books.data';

type BookDetailProps = {
  book: Book;
};

export default function BookDetail({ book }: Readonly<BookDetailProps>) {
  const relatedBooks = getRelatedBooks(book, 2);

  return (
    <div className='pb-4'>
      <BookDetailBreadcrumbs book={book} />
      <BookDetailHero book={book} />
      <BookDetailRelated books={relatedBooks} />
      <HomeFooter />
    </div>
  );
}
