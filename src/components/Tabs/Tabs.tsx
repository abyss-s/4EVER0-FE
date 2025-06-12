import { Tabs as TabsPrimitive, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import type { TabsComponentProps } from './Tabs.types';

export const Tabs = ({ items, defaultValue, className }: TabsComponentProps) => {
  return (
    <TabsPrimitive
      defaultValue={defaultValue ?? items[0]?.value}
      className={cn('w-[400px]', className)}
    >
      <TabsList>
        {items.map(({ value, label }) => (
          <TabsTrigger key={value} value={value}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map(({ value, content }) => (
        <TabsContent key={value} value={value}>
          {content}
        </TabsContent>
      ))}
    </TabsPrimitive>
  );
};
