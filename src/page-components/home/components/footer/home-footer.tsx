import Link from 'next/link';

const SHOP_LINKS = [
  { label: 'New arrivals', href: '/shop-all' },
  { label: 'Bestsellers', href: '/shop-all' },
  { label: 'Fiction', href: '/fiction' },
  { label: 'Mystery', href: '/mystery' },
  { label: 'Children', href: '/children' },
  { label: 'Poetry', href: '/poetry' },
];

const ABOUT_LINKS = [
  { label: 'Our story', href: '/shop-all' },
  { label: 'Events', href: '/shop-all' },
  { label: 'Journal', href: '/shop-all' },
  { label: 'Careers', href: '/shop-all' },
  { label: 'Contact', href: '/shop-all' },
];

export default function HomeFooter() {
  return (
    <footer className='mt-16 rounded-3xl bg-landing-footer px-8 py-12 text-white md:px-10'>
      <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-4'>
        <div>
          <div className='flex items-center gap-2.5'>
            <span className='flex size-9 items-center justify-center rounded-full bg-landing-brown text-sm font-semibold text-white'>
              P
            </span>
            <span className='font-serif text-xl font-semibold'>Pages & Co.</span>
          </div>
          <p className='mt-4 max-w-xs text-sm leading-7 text-white/65'>
            An independent bookstore celebrating stories, community, and the joy of reading since 1987.
          </p>
          <div className='mt-5 flex gap-3'>
            {['f', 't', 'i'].map(social => (
              <span
                key={social}
                className='flex size-9 items-center justify-center rounded-full border border-white/15 text-xs uppercase text-white/80'
              >
                {social}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className='text-xs font-semibold tracking-[0.2em] text-white/55 uppercase'>Shop</h3>
          <ul className='mt-4 space-y-3'>
            {SHOP_LINKS.map(link => (
              <li key={link.label}>
                <Link href={link.href} className='text-sm text-white/75 transition hover:text-white'>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='text-xs font-semibold tracking-[0.2em] text-white/55 uppercase'>About</h3>
          <ul className='mt-4 space-y-3'>
            {ABOUT_LINKS.map(link => (
              <li key={link.label}>
                <Link href={link.href} className='text-sm text-white/75 transition hover:text-white'>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='text-xs font-semibold tracking-[0.2em] text-white/55 uppercase'>The Reading Room</h3>
          <p className='mt-4 text-sm leading-7 text-white/65'>
            Join our free membership for early access, exclusive events, and member-only discounts.
          </p>
          <form className='mt-5 flex overflow-hidden rounded-full border border-white/15 bg-white/5'>
            <input
              type='email'
              placeholder='Your email'
              className='min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/40'
            />
            <button
              type='button'
              className='inline-flex items-center justify-center bg-landing-badge px-5 text-sm font-semibold text-landing-brown-dark'
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className='mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between'>
        <p>© 2026 Pages & Co. All rights reserved.</p>
        <div className='flex gap-4'>
          <Link href='/shop-all' className='hover:text-white/70'>
            Privacy
          </Link>
          <Link href='/shop-all' className='hover:text-white/70'>
            Terms
          </Link>
          <Link href='/shop-all' className='hover:text-white/70'>
            Accessibility
          </Link>
        </div>
      </div>
    </footer>
  );
}
