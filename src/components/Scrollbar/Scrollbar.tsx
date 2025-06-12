import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export interface ScrollbarProps {
  children: React.ReactNode;
  className?: string;
}

export const Scrollbar = ({ children, className }: ScrollbarProps) => {
  return (
    <ScrollArea className={cn('h-[200px] w-[350px] rounded-md border p-4', className)}>
      {children}
    </ScrollArea>
  );
};
