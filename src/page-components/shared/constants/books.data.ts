export type BookCategory =
  | 'fiction'
  | 'mystery'
  | 'sci-fi'
  | 'non-fiction'
  | 'poetry'
  | 'children'
  | 'biography';

export type Book = {
  id: string;
  slug: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  rating: number;
  coverColor: string;
  category: BookCategory;
  tag?: 'BESTSELLER' | 'NEW';
  description: string;
  pages: number;
  publishedYear: number;
  format: string;
  publisher: string;
  language: string;
  isbn: string;
};

export const BOOKS: Book[] = [
  {
    id: '1',
    slug: 'the-lighthouse-keeper',
    title: 'The Lighthouse Keeper',
    author: 'Mara Ellison',
    price: 18,
    originalPrice: 24,
    rating: 4.6,
    coverColor: '#3f6f5a',
    category: 'fiction',
    tag: 'BESTSELLER',
    description:
      'A widowed keeper and a runaway girl share a winter on a remote island, learning what it means to keep a light burning for someone else.',
    pages: 312,
    publishedYear: 2023,
    format: 'Paperback',
    publisher: 'Harbor & Vale',
    language: 'English',
    isbn: '978-1-23456-001-2',
  },
  {
    id: '2',
    slug: 'ashes-in-the-archive',
    title: 'Ashes in the Archive',
    author: 'Jonah Pike',
    price: 15.5,
    rating: 4.4,
    coverColor: '#3f4f68',
    category: 'mystery',
    description:
      'When a rare manuscript vanishes from a sealed vault, an archivist must follow a trail of forgeries through a city that prefers its secrets buried.',
    pages: 288,
    publishedYear: 2022,
    format: 'Paperback',
    publisher: 'Harbor & Vale',
    language: 'English',
    isbn: '978-1-23456-002-9',
  },
  {
    id: '3',
    slug: 'orbital-driftwood',
    title: 'Orbital Driftwood',
    author: 'Sera Vaine',
    price: 21,
    rating: 4.7,
    coverColor: '#4f8a84',
    category: 'sci-fi',
    tag: 'BESTSELLER',
    description:
      'A salvage crew discovers a derelict station drifting beyond the outer belt, carrying logs from a civilization that never meant to be found.',
    pages: 336,
    publishedYear: 2024,
    format: 'Paperback',
    publisher: 'Northlight Press',
    language: 'English',
    isbn: '978-1-23456-003-6',
  },
  {
    id: '4',
    slug: 'the-quiet-economy',
    title: 'The Quiet Economy',
    author: 'Diana Corm',
    price: 19.99,
    rating: 4.2,
    coverColor: '#7a5a45',
    category: 'non-fiction',
    description:
      'An intimate study of small businesses that thrive without scale, and the communities that keep them alive through changing seasons.',
    pages: 264,
    publishedYear: 2023,
    format: 'Paperback',
    publisher: 'Harbor & Vale',
    language: 'English',
    isbn: '978-1-23456-004-3',
  },
  {
    id: '5',
    slug: 'salt-and-other-small-gods',
    title: 'Salt & Other Small Gods',
    author: 'Lior Maran',
    price: 13,
    rating: 4.8,
    coverColor: '#6f5a8b',
    category: 'poetry',
    tag: 'NEW',
    description:
      'Lyric poems that trace the shoreline between devotion and doubt, where ordinary rituals become acts of quiet faith.',
    pages: 96,
    publishedYear: 2024,
    format: 'Paperback',
    publisher: 'Tide & Ink',
    language: 'English',
    isbn: '978-1-23456-005-0',
  },
  {
    id: '6',
    slug: 'pip-and-the-paper-moon',
    title: 'Pip and the Paper Moon',
    author: 'Anya Rourke',
    price: 11.5,
    rating: 4.8,
    coverColor: '#b08a45',
    category: 'children',
    tag: 'BESTSELLER',
    description:
      'Pip folds a moon from silver paper and sails it over rooftops, searching for the friend who moved away before summer ended.',
    pages: 48,
    publishedYear: 2023,
    format: 'Hardcover',
    publisher: 'Little Harbor',
    language: 'English',
    isbn: '978-1-23456-006-7',
  },
  {
    id: '7',
    slug: 'a-house-of-borrowed-light',
    title: 'A House of Borrowed Light',
    author: 'Felix North',
    price: 17.25,
    originalPrice: 22,
    rating: 4.5,
    coverColor: '#5a4f78',
    category: 'fiction',
    description:
      'Two estranged siblings inherit a crumbling manor where every window holds a memory, and every room asks them to choose what to keep.',
    pages: 304,
    publishedYear: 2022,
    format: 'Paperback',
    publisher: 'Harbor & Vale',
    language: 'English',
    isbn: '978-1-23456-007-4',
  },
  {
    id: '8',
    slug: 'hands-in-the-soil',
    title: 'Hands in the Soil',
    author: 'Priya Mehta',
    price: 23,
    rating: 4.2,
    coverColor: '#3f5a48',
    category: 'biography',
    description:
      'From village terraces to global tables, one farmer recounts decades of planting, loss, and the stubborn hope of the next harvest.',
    pages: 352,
    publishedYear: 2023,
    format: 'Hardcover',
    publisher: 'Northlight Press',
    language: 'English',
    isbn: '978-1-23456-008-1',
  },
  {
    id: '9',
    slug: 'the-saltmarsh-murders',
    title: 'The Saltmarsh Murders',
    author: 'Clark & Webb',
    price: 16,
    rating: 4.1,
    coverColor: '#8b5a67',
    category: 'mystery',
    description:
      'A retired detective returns to the marshlands when a second body appears at low tide, reopening a case the town never fully closed.',
    pages: 276,
    publishedYear: 2022,
    format: 'Paperback',
    publisher: 'Harbor & Vale',
    language: 'English',
    isbn: '978-1-23456-009-8',
  },
  {
    id: '10',
    slug: 'threads-of-the-void',
    title: 'Threads of the Void',
    author: 'Nadia Okoro',
    price: 20.5,
    rating: 4.6,
    coverColor: '#4a5f7a',
    category: 'sci-fi',
    tag: 'NEW',
    description:
      'In a city woven from signal and shadow, a programmer unravels a pattern in the noise that suggests the void is answering back.',
    pages: 320,
    publishedYear: 2024,
    format: 'Paperback',
    publisher: 'Northlight Press',
    language: 'English',
    isbn: '978-1-23456-010-4',
  },
  {
    id: '11',
    slug: 'letters-from-the-orchard',
    title: 'Letters from the Orchard',
    author: 'Helen Marsh',
    price: 16.75,
    rating: 4.4,
    coverColor: '#6b5344',
    category: 'fiction',
    description:
      'A correspondence spanning twenty years reveals how two friends tended an orchard—and each other—through distance and doubt.',
    pages: 292,
    publishedYear: 2023,
    format: 'Paperback',
    publisher: 'Harbor & Vale',
    language: 'English',
    isbn: '978-1-23456-011-1',
  },
  {
    id: '12',
    slug: 'winter-census',
    title: 'Winter Census',
    author: 'Tom Calder',
    price: 18.5,
    rating: 4.0,
    coverColor: '#5f6f86',
    category: 'non-fiction',
    description:
      'A field biologist spends a season counting what remains, documenting species and stories along a coast reshaped by storms.',
    pages: 240,
    publishedYear: 2022,
    format: 'Paperback',
    publisher: 'Tide & Ink',
    language: 'English',
    isbn: '978-1-23456-012-8',
  },
  {
    id: '13',
    slug: 'moonlit-verse',
    title: 'Moonlit Verse',
    author: 'Isla Grant',
    price: 13.25,
    rating: 4.7,
    coverColor: '#7a4f57',
    category: 'poetry',
    description:
      'Night poems that move from harbor lamps to open water, finding rhythm in tides, lullabies, and the hush between waves.',
    pages: 88,
    publishedYear: 2023,
    format: 'Paperback',
    publisher: 'Tide & Ink',
    language: 'English',
    isbn: '978-1-23456-013-5',
  },
  {
    id: '14',
    slug: 'the-little-mapmaker',
    title: 'The Little Mapmaker',
    author: 'Rosa Penn',
    price: 12,
    rating: 4.8,
    coverColor: '#8a6b4f',
    category: 'children',
    description:
      'Milo draws maps of imaginary countries until a real adventure asks him to navigate a forest with nothing but courage and crayons.',
    pages: 56,
    publishedYear: 2024,
    format: 'Hardcover',
    publisher: 'Little Harbor',
    language: 'English',
    isbn: '978-1-23456-014-2',
  },
];

export const getBookBySlug = (slug: string) => BOOKS.find(book => book.slug === slug);

export const getRelatedBooks = (book: Book, limit = 2) =>
  BOOKS.filter(item => item.id !== book.id && item.category === book.category).slice(0, limit);
