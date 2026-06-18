import { BOOKS, type Book, type BookCategory } from '@/page-components/shared/constants/books.data';

export type ShopAllCategory = 'all' | BookCategory;

export type ShopAllBook = Book;

export const SHOP_ALL_CATEGORIES: { id: ShopAllCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'fiction', label: 'Fiction' },
  { id: 'mystery', label: 'Mystery' },
  { id: 'sci-fi', label: 'Sci-Fi' },
  { id: 'non-fiction', label: 'Non-fiction' },
  { id: 'poetry', label: 'Poetry' },
  { id: 'children', label: 'Children' },
  { id: 'biography', label: 'Biography' },
];

export const SHOP_ALL_SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
] as const;

export type ShopAllSortValue = (typeof SHOP_ALL_SORT_OPTIONS)[number]['value'];

export const SHOP_ALL_BOOKS = BOOKS;
