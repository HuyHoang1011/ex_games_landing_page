import HomeBookSection from '@/page-components/home/components/books/home-book-section';
import HomeFooter from '@/page-components/home/components/footer/home-footer';
import HomeGenreSection from '@/page-components/home/components/genre/home-genre-section';
import HomeHero from '@/page-components/home/components/hero/home-hero';
import HomePromoBanner from '@/page-components/home/components/promo/home-promo-banner';
import {
  HOME_BESTSELLER_BOOKS,
  HOME_FEATURED_BOOKS,
  HOME_NEW_ARRIVALS,
} from '@/page-components/home/constants/home.data';

export default function Home() {
  return (
    <div className='pb-4'>
      <HomeHero />
      <HomeGenreSection />
      <HomeBookSection
        label="EDITOR'S PICKS"
        title='Featured this month'
        books={HOME_FEATURED_BOOKS}
        viewAllHref='/shop-all'
      />
      <HomeBookSection
        label='READER FAVORITES'
        title='Bestsellers'
        books={HOME_BESTSELLER_BOOKS}
        viewAllHref='/shop-all'
      />
      <HomeBookSection label='JUST LANDED' title='New arrivals' books={HOME_NEW_ARRIVALS} viewAllHref='/shop-all' />
      <HomePromoBanner />
      <HomeFooter />
    </div>
  );
}
