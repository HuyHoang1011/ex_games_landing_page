import Link from 'next/link';

type HomeSectionHeaderProps = {
  label: string;
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
};

export default function HomeSectionHeader({
  label,
  title,
  viewAllHref,
  viewAllLabel = 'View all',
}: Readonly<HomeSectionHeaderProps>) {
  return (
    <div className='mb-6 flex items-end justify-between gap-4'>
      <div>
        <p className='text-xs font-semibold tracking-[0.2em] text-[#8a7f72] uppercase'>{label}</p>
        <h2 className='mt-2 font-serif text-3xl font-semibold text-landing-brown-dark md:text-4xl'>{title}</h2>
      </div>
      {viewAllHref ? (
        <Link
          href={viewAllHref}
          className='shrink-0 text-sm font-medium text-[#6f6458] transition-colors hover:text-landing-brown-dark'
        >
          {viewAllLabel} →
        </Link>
      ) : null}
    </div>
  );
}
