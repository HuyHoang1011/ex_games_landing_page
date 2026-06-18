import { type BookCategory } from '@/page-components/shared/constants/books.data';

const CATEGORY_LABELS: Record<BookCategory, string> = {
  fiction: 'FICTION',
  mystery: 'MYSTERY',
  'sci-fi': 'SCI-FI',
  'non-fiction': 'NON-FICTION',
  poetry: 'POETRY',
  children: 'CHILDREN',
  biography: 'BIOGRAPHY',
};

export const formatBookPrice = (value: number) => `$${value.toFixed(2)}`;

export const getCategoryLabel = (category: BookCategory) => CATEGORY_LABELS[category];
