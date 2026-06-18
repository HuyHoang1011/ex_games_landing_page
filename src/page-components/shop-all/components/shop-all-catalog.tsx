'use client';

import { ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';

import { cn } from '@/cores/shadcn/lib/utils';
import ShopAllBookCard from '@/page-components/shop-all/components/shop-all-book-card';
import {
  SHOP_ALL_BOOKS,
  SHOP_ALL_CATEGORIES,
  SHOP_ALL_SORT_OPTIONS,
  type ShopAllCategory,
  type ShopAllSortValue,
} from '@/page-components/shop-all/constants/shop-all.data';

export default function ShopAllCatalog() {
  const [activeCategory, setActiveCategory] = useState<ShopAllCategory>('all');
  const [sortBy, setSortBy] = useState<ShopAllSortValue>('featured');

  const filteredBooks = useMemo(() => {
    const byCategory =
      activeCategory === 'all' ? SHOP_ALL_BOOKS : SHOP_ALL_BOOKS.filter(book => book.category === activeCategory);

    const sorted = [...byCategory];

    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return sorted;
  }, [activeCategory, sortBy]);

  return (
    <>
      <div className='mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
        <div className='flex flex-wrap gap-2'>
          {SHOP_ALL_CATEGORIES.map(category => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type='button'
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition',
                  isActive
                    ? 'border-landing-brown bg-landing-brown text-white'
                    : 'border-[#ddd4c8] bg-[#f3ece2] text-landing-brown-dark hover:border-[#cfc4b6]',
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <label className='flex items-center gap-2 text-sm text-[#7a7064]'>
          <span>Sort by</span>
          <div className='relative'>
            <select
              value={sortBy}
              onChange={event => setSortBy(event.target.value as ShopAllSortValue)}
              className='appearance-none rounded-full border border-[#ddd4c8] bg-[#f3ece2] py-2 pr-9 pl-4 text-sm font-medium text-landing-brown-dark outline-none'
            >
              {SHOP_ALL_SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className='pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#7a7064]' />
          </div>
        </label>
      </div>

      <div className='mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5'>
        {filteredBooks.map(book => (
          <ShopAllBookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
}
