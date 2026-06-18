import { type ReactNode } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/cores/shadcn/components/ui/tooltip';

export interface TooltipProps {
  children: React.ReactNode;
  value: string;
  valueCom?: ReactNode;
  side?: 'bottom' | 'top' | 'right' | 'left';
  isDisable?: boolean;
}

export default function CoreTooltip({ children, side = 'top', value, valueCom, isDisable }: Readonly<TooltipProps>) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        {isDisable ? null : <TooltipContent side={side}>{valueCom ?? <p>{value}</p>}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}
