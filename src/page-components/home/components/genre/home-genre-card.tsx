import Link from 'next/link';

import { type HomeGenre } from '@/page-components/home/constants/home.data';

type HomeGenreCardProps = {
  genre: HomeGenre;
};

export default function HomeGenreCard({ genre }: Readonly<HomeGenreCardProps>) {
  return (
    <Link
      href={genre.href}
      className='group flex min-h-28 flex-col justify-between rounded-2xl p-4 text-white transition hover:scale-[1.02] hover:shadow-md'
      style={{ backgroundColor: genre.color }}
    >
      <span className='text-sm font-semibold'>{genre.name}</span>
      <span className='text-xs text-white/80'>{genre.count.toLocaleString()}</span>
    </Link>
  );
}
