import BagAuthGuard from '@/modules/auth/components/bag-auth-guard';
import BagBreadcrumbs from '@/page-components/bag/components/bag-breadcrumbs';
import BagContent from '@/page-components/bag/components/bag-content';
import BagFooter from '@/page-components/bag/components/bag-footer';

export default function Bag() {
  return (
    <div className='pb-4'>
      <BagBreadcrumbs />
      <h1 className='mt-6 font-serif text-5xl font-semibold text-landing-brown-dark md:text-6xl'>Your bag</h1>
      <BagAuthGuard>
        <BagContent />
      </BagAuthGuard>
      <BagFooter />
    </div>
  );
}
