import ShopAllBreadcrumbs from '@/page-components/shop-all/components/shop-all-breadcrumbs';
import ShopAllCatalog from '@/page-components/shop-all/components/shop-all-catalog';
import ShopAllPageHeader from '@/page-components/shop-all/components/shop-all-page-header';
import ShopAllSimpleFooter from '@/page-components/shop-all/components/shop-all-simple-footer';
import { SHOP_ALL_BOOKS } from '@/page-components/shop-all/constants/shop-all.data';

export default function ShopAll() {
  return (
    <div className='pb-2'>
      <ShopAllBreadcrumbs />
      <ShopAllPageHeader totalTitles={SHOP_ALL_BOOKS.length} />
      <ShopAllCatalog />
      <ShopAllSimpleFooter />
    </div>
  );
}
