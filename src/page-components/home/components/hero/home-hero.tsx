'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { cn } from '@/cores/shadcn/lib/utils';
import { HOME_HERO_SLIDES } from '@/page-components/home/constants/home.data';

export default function HomeHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = HOME_HERO_SLIDES[activeIndex];
  const total = HOME_HERO_SLIDES.length;

  const goPrev = () => setActiveIndex(prev => (prev === 0 ? total - 1 : prev - 1));
  const goNext = () => setActiveIndex(prev => (prev === total - 1 ? 0 : prev + 1));

  return (
    <section className='relative overflow-hidden rounded-3xl bg-landing-forest px-6 py-12 text-white md:px-10 md:py-16'>
      <button
        type='button'
        aria-label='Previous slide'
        onClick={goPrev}
        className='absolute top-1/2 left-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20'
      >
        <ChevronLeft className='size-5' />
      </button>

      <button
        type='button'
        aria-label='Next slide'
        onClick={goNext}
        className='absolute top-1/2 right-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20'
      >
        <ChevronRight className='size-5' />
      </button>

      <div className='mx-auto w-full max-w-4xl text-center md:max-w-5xl'>
        <p className='text-xs font-semibold tracking-[0.25em] text-white/70 uppercase'>{slide.label}</p>
        <h1 className='mt-4 font-serif text-4xl leading-tight font-semibold md:text-5xl'>{slide.title}</h1>
        <p className='mx-auto mt-5 max-w-3xl text-sm leading-7 text-white/80 md:max-w-4xl md:text-base'>
          {slide.description}
        </p>
        <Link
          href={slide.href}
          className='mt-8 inline-flex h-11 items-center justify-center rounded-full bg-landing-badge px-6 text-sm font-semibold text-landing-brown-dark transition hover:opacity-90'
        >
          {slide.cta}
        </Link>

        <div className='mt-8 flex items-center justify-center gap-2'>
          {HOME_HERO_SLIDES.map((item, index) => (
            <button
              key={item.id}
              type='button'
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'size-2 rounded-full transition',
                index === activeIndex ? 'bg-white' : 'bg-white/35 hover:bg-white/55',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
