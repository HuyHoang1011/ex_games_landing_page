import HomeSectionHeader from '@/page-components/home/components/shared/home-section-header';
import HomeGenreCard from '@/page-components/home/components/genre/home-genre-card';
import { HOME_GENRES } from '@/page-components/home/constants/home.data';

export default function HomeGenreSection() {
  return (
    <section className='mt-14'>
      <HomeSectionHeader label='FIND YOUR GENRE' title='Browse by genre' />
      <div className='grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6'>
        {HOME_GENRES.map(genre => (
          <HomeGenreCard key={genre.name} genre={genre} />
        ))}
      </div>
    </section>
  );
}
