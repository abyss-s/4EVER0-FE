import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { scrollbarVariants } from './scrollbarVariants';
import type { ScrollbarProps } from './Scrollbar.types';

export const Scrollbar = ({ children, className, size, ...props }: ScrollbarProps) => {
  return (
    <div className={cn(scrollbarVariants({ size }), className)} {...props}>
      <ScrollArea className="h-full w-full">
        <div className="p-4">{children}</div>
      </ScrollArea>
    </div>
  );
};
