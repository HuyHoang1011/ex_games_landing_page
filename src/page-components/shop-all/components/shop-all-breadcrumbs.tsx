import Link from 'next/link';

export default function ShopAllBreadcrumbs() {
  return (
    <nav aria-label='Breadcrumb' className='text-sm text-[#8a7f72]'>
      <Link href='/' className='transition hover:text-landing-brown-dark'>
        Home
      </Link>
      <span className='mx-2'>/</span>
      <span className='text-landing-brown-dark'>Books</span>
    </nav>
  );
}
