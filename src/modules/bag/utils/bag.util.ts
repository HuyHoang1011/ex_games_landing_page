import { BOOKS, type Book } from '@/page-components/shared/constants/books.data';
import { type BagLineItem } from '@/modules/bag/stores/use-bag.store';

export type BagEntry = BagLineItem & {
  book: Book;
  lineTotal: number;
};

export const resolveBagEntries = (items: BagLineItem[]): BagEntry[] =>
  items
    .map(item => {
      const book = BOOKS.find(entry => entry.id === item.bookId);
      if (!book) return null;

      return {
        ...item,
        book,
        lineTotal: book.price * item.quantity,
      };
    })
    .filter((entry): entry is BagEntry => entry !== null);

export const getBagSubtotal = (entries: BagEntry[]) => entries.reduce((sum, entry) => sum + entry.lineTotal, 0);
