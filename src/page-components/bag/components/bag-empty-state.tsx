import Link from 'next/link';

export default function BagEmptyState() {
  return (
    <div className='mt-10 rounded-2xl border border-dashed border-[#ddd4c8] bg-white/70 px-6 py-16 text-center'>
      <h2 className='font-serif text-2xl font-semibold text-landing-brown-dark'>Your bag is empty</h2>
      <p className='mt-3 text-sm text-[#7a7064]'>Browse our collection and add a few titles to get started.</p>
      <Link
        href='/shop-all'
        className='mt-6 inline-flex h-11 items-center justify-center rounded-full bg-landing-brown-dark px-6 text-sm font-semibold text-white transition hover:bg-landing-brown'
      >
        Shop all books
      </Link>
    </div>
  );
}
