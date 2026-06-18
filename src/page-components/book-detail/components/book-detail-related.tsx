import { type Book } from '@/page-components/shared/constants/books.data';
import BookDetailRelatedCard from '@/page-components/book-detail/components/book-detail-related-card';

type BookDetailRelatedProps = {
  books: Book[];
};

export default function BookDetailRelated({ books }: Readonly<BookDetailRelatedProps>) {
  if (books.length === 0) {
    return null;
  }

  return (
    <section className='mt-16 border-t border-[#e8dfd3] pt-12'>
      <h2 className='font-serif text-3xl font-semibold text-landing-brown-dark'>You may also like</h2>
      <div className='mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'>
        {books.map(book => (
          <BookDetailRelatedCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
