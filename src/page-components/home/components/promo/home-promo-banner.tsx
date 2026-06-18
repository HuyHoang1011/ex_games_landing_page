export default function HomePromoBanner() {
  return (
    <section className='mt-14 overflow-hidden rounded-3xl bg-landing-forest px-8 py-10 text-white md:flex md:items-center md:justify-between md:px-12 md:py-12'>
      <div className='max-w-2xl'>
        <p className='text-xs font-semibold tracking-[0.2em] text-landing-forest-accent uppercase'>THE READING ROOM</p>
        <h2 className='mt-3 font-serif text-3xl leading-tight font-semibold md:text-4xl'>
          Free shipping on every order over $35
        </h2>
        <p className='mt-3 text-sm leading-7 text-white/80 md:text-base'>
          Plus 10% off your first purchase when you join our free program.
        </p>
      </div>
      <button
        type='button'
        className='mt-6 inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-landing-badge px-6 text-sm font-semibold text-landing-brown-dark transition hover:opacity-90 md:mt-0'
      >
        Join free
      </button>
    </section>
  );
}
