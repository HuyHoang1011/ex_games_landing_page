'use client';

import useBagStore from '@/modules/bag/stores/use-bag.store';
import { useBagTotalQuantity } from '@/modules/bag/hooks/use-bag-count.hook';
import { getBagSubtotal, resolveBagEntries } from '@/modules/bag/utils/bag.util';
import BagEmptyState from '@/page-components/bag/components/bag-empty-state';
import BagItemCard from '@/page-components/bag/components/bag-item-card';
import BagOrderSummary from '@/page-components/bag/components/bag-order-summary';

export default function BagContent() {
  const items = useBagStore(state => state.items);
  const totalQuantity = useBagTotalQuantity();
  const entries = resolveBagEntries(items);
  const subtotal = getBagSubtotal(entries);

  if (entries.length === 0) {
    return <BagEmptyState />;
  }

  return (
    <div className='mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start'>
      <div className='space-y-4'>
        {entries.map(entry => (
          <BagItemCard key={entry.bookId} entry={entry} />
        ))}
      </div>

      <BagOrderSummary itemCount={totalQuantity} subtotal={subtotal} />
    </div>
  );
}
