export type HomeGenre = {
  name: string;
  count: number;
  href: string;
  color: string;
};

export type HomeBook = {
  id: string;
  title: string;
  author: string;
  price: string;
  coverColor: string;
  tag?: 'BESTSELLER' | 'NEW';
};

export const HOME_HERO_SLIDES = [
  {
    id: 'staff-favorites',
    label: 'STAFF FAVORITES',
    title: 'The shelves we keep coming back to',
    description:
      'Discover staff picks from short page-turners to timeless reads — curated for every kind of reader.',
    cta: 'Browse bestsellers',
    href: '/shop-all',
  },
];

export const HOME_GENRES: HomeGenre[] = [
  { name: 'Fiction', count: 1234, href: '/fiction', color: '#8b5e4b' },
  { name: 'Mystery', count: 876, href: '/mystery', color: '#5f6f86' },
  { name: 'Children', count: 654, href: '/children', color: '#4f8a84' },
  { name: 'Poetry', count: 432, href: '/poetry', color: '#8b5a67' },
  { name: 'Sci-Fi', count: 567, href: '/shop-all', color: '#b08a45' },
  { name: 'Romance', count: 789, href: '/shop-all', color: '#6f5a8b' },
];

export const HOME_FEATURED_BOOKS: HomeBook[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: '$18.00',
    coverColor: '#3f6f5a',
    tag: 'BESTSELLER',
  },
  {
    id: '2',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    price: '$16.50',
    coverColor: '#4a6278',
    tag: 'BESTSELLER',
  },
  {
    id: '3',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    price: '$17.00',
    coverColor: '#7a4f57',
    tag: 'NEW',
  },
  {
    id: '4',
    title: 'Educated',
    author: 'Tara Westover',
    price: '$19.00',
    coverColor: '#5a4f78',
  },
  {
    id: '5',
    title: 'Circe',
    author: 'Madeline Miller',
    price: '$17.50',
    coverColor: '#4f6f8a',
    tag: 'NEW',
  },
];

export const HOME_BESTSELLER_BOOKS: HomeBook[] = [
  {
    id: '6',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: '$16.00',
    coverColor: '#6b5344',
    tag: 'BESTSELLER',
  },
  {
    id: '7',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    price: '$17.00',
    coverColor: '#4f6a72',
    tag: 'BESTSELLER',
  },
  {
    id: '8',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    price: '$18.50',
    coverColor: '#5f6b4a',
    tag: 'BESTSELLER',
  },
  {
    id: '9',
    title: 'Lessons in Chemistry',
    author: 'Bonnie Garmus',
    price: '$16.75',
    coverColor: '#7a5a62',
    tag: 'BESTSELLER',
  },
  {
    id: '10',
    title: 'Tomorrow, and Tomorrow, and Tomorrow',
    author: 'Gabrielle Zevin',
    price: '$18.00',
    coverColor: '#4a5f7a',
    tag: 'BESTSELLER',
  },
];

export const HOME_NEW_ARRIVALS: HomeBook[] = [
  {
    id: '11',
    title: 'The Heaven & Earth Grocery Store',
    author: 'James McBride',
    price: '$19.00',
    coverColor: '#4f7a68',
    tag: 'NEW',
  },
  {
    id: '12',
    title: 'Yellowface',
    author: 'R.F. Kuang',
    price: '$17.00',
    coverColor: '#8a6b4f',
    tag: 'NEW',
  },
  {
    id: '13',
    title: 'Fourth Wing',
    author: 'Rebecca Yarros',
    price: '$18.00',
    coverColor: '#6a4f5f',
    tag: 'NEW',
  },
  {
    id: '14',
    title: 'The Covenant of Water',
    author: 'Abraham Verghese',
    price: '$20.00',
    coverColor: '#4f5a7a',
    tag: 'NEW',
  },
  {
    id: '15',
    title: 'Hello Beautiful',
    author: 'Ann Napolitano',
    price: '$17.50',
    coverColor: '#5f7a5a',
    tag: 'NEW',
  },
];
