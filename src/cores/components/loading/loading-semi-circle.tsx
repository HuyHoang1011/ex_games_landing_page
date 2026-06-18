import { cn } from '@/cores/shadcn/lib/utils';

export default function LoadingSemiCircle({ className }: { className?: string }) {
  return <div className={cn('animate-spin rounded-full size-5 border-b-2 border-primary', className)} />;
}
