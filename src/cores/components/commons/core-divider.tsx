import { cn } from '@/cores/shadcn/lib/utils';

interface Props {
  className?: string;
}

export default function CoreDivider({ className }: Readonly<Props>) {
  return <div className={cn('border-b-[2px] border-primary', className)} />;
}
