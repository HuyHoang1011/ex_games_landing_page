import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import useBagStore from '@/modules/bag/stores/use-bag.store';
import { type PendingAuthAction } from '@/modules/auth/stores/use-auth-modal.store';

export const runPendingAuthAction = (action: PendingAuthAction | null, router: ReturnType<typeof useRouter>) => {
  if (!action) return;

  switch (action.type) {
    case 'add-to-bag': {
      useBagStore.getState().addItem(action.bookId);
      toast.success('Added to your bag.');
      break;
    }
    case 'open-bag':
      router.push('/bag');
      break;
    default:
      break;
  }
};
