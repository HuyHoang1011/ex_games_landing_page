import HomeBookCard from '@/page-components/home/components/books/home-book-card';
import HomeSectionHeader from '@/page-components/home/components/shared/home-section-header';
import { type HomeBook } from '@/page-components/home/constants/home.data';

type HomeBookSectionProps = {
  label: string;
  title: string;
  books: HomeBook[];
  viewAllHref: string;
};

export default function HomeBookSection({ label, title, books, viewAllHref }: Readonly<HomeBookSectionProps>) {
  return (
    <section className='mt-14'>
      <HomeSectionHeader label={label} title={title} viewAllHref={viewAllHref} />
      <div className='grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5'>
        {books.map(book => (
          <HomeBookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
