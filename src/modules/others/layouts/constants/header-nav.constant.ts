import { CORE_ROUTER } from '@/cores/configs/core-router.config';

export type HeaderNavItem = {
  title: string;
  href: string;
};

export const HEADER_NAV_ITEMS: HeaderNavItem[] = [
  { title: 'Home', href: CORE_ROUTER.HOME },
  { title: 'Shop All', href: CORE_ROUTER.SHOP_ALL },
  { title: 'Fiction', href: CORE_ROUTER.FICTION },
  { title: 'Mystery', href: CORE_ROUTER.MYSTERY },
  { title: 'Children', href: CORE_ROUTER.CHILDREN },
  { title: 'Poetry', href: CORE_ROUTER.POETRY },
];
