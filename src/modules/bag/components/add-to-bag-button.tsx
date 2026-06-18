'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { cn } from '@/cores/shadcn/lib/utils';
import { useIsAuthenticated } from '@/modules/auth/hooks/use-auth.hook';
import useAuthModalStore from '@/modules/auth/stores/use-auth-modal.store';
import useBagStore from '@/modules/bag/stores/use-bag.store';
import { formatBookPrice } from '@/page-components/shared/utils/book.util';

type AddToBagButtonProps = {
  bookId: string;
  price: number;
  className?: string;
  redirectToBag?: boolean;
};

export default function AddToBagButton({
  bookId,
  price,
  className,
  redirectToBag = false,
}: Readonly<AddToBagButtonProps>) {
  const router = useRouter();
  const addItem = useBagStore(state => state.addItem);
  const isAuthenticated = useIsAuthenticated();
  const openLogin = useAuthModalStore(state => state.openLogin);

  const handleAdd = () => {
    if (!isAuthenticated) {
      openLogin({ type: 'add-to-bag', bookId });
      return;
    }

    addItem(bookId);
    toast.success('Added to your bag.');

    if (redirectToBag) {
      router.push('/bag');
    }
  };

  return (
    <button
      type='button'
      onClick={handleAdd}
      className={cn(
        'inline-flex h-12 items-center justify-center rounded-full bg-landing-brown-dark px-8 text-sm font-semibold text-white transition hover:bg-landing-brown',
        className,
      )}
    >
      Add to bag — {formatBookPrice(price)}
    </button>
  );
}
