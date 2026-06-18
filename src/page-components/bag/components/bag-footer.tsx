import Link from 'next/link';

const SHOP_LINKS = [
  { label: 'New arrivals', href: '/shop-all' },
  { label: 'Bestsellers', href: '/shop-all' },
  { label: 'Fiction', href: '/fiction' },
  { label: 'Children', href: '/children' },
  { label: 'Gift cards', href: '/shop-all' },
];

const ABOUT_LINKS = [
  { label: 'Our story', href: '/shop-all' },
  { label: 'Events', href: '/shop-all' },
  { label: 'Visit the shop', href: '/shop-all' },
  { label: 'Journal', href: '/shop-all' },
];

const HELP_LINKS = [
  { label: 'Shipping', href: '/shop-all' },
  { label: 'Returns', href: '/shop-all' },
  { label: 'FAQ', href: '/shop-all' },
  { label: 'Contact', href: '/shop-all' },
];

export default function BagFooter() {
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
            An independent bookshop for readers who like to take their time. Open since 1995.
          </p>
          <div className='mt-5 flex gap-3'>
            {['i', 'x', 'f'].map(social => (
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
          <h3 className='text-xs font-semibold tracking-[0.2em] text-landing-badge uppercase'>Shop</h3>
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
          <h3 className='text-xs font-semibold tracking-[0.2em] text-landing-badge uppercase'>About</h3>
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
          <h3 className='text-xs font-semibold tracking-[0.2em] text-landing-badge uppercase'>Help</h3>
          <ul className='mt-4 space-y-3'>
            {HELP_LINKS.map(link => (
              <li key={link.label}>
                <Link href={link.href} className='text-sm text-white/75 transition hover:text-white'>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='mt-10 border-t border-white/10 pt-10'>
        <h3 className='text-xs font-semibold tracking-[0.2em] text-landing-badge uppercase'>The Reading Room</h3>
        <p className='mt-4 max-w-md text-sm leading-7 text-white/65'>
          Join our newsletter for early access to new titles, author events, and member-only offers.
        </p>
        <form className='mt-5 flex max-w-md overflow-hidden rounded-full border border-white/15 bg-white/5'>
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
    </footer>
  );
}
