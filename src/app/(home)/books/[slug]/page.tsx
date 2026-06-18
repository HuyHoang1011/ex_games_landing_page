import { notFound } from 'next/navigation';

import BookDetail from '@/page-components/book-detail/book-detail';
import { getBookBySlug } from '@/page-components/shared/constants/books.data';

type BookDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BookDetailPage({ params }: Readonly<BookDetailPageProps>) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return <BookDetail book={book} />;
}
