import { cn } from '@/lib/utils';
import { BRAND_CATEGORIES } from '@/types/brand';

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

export const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide touch-scroll">
      <div className="inline-flex gap-2 px-1 py-2">
        {BRAND_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onSelect(cat.value)}
            className={cn(
              'flex-shrink-0 whitespace-nowrap shadow-sm transition-colors rounded-full font-medium',
              'text-xs px-4 py-2 border',
              selected === cat.value
                ? 'bg-[var(--color-brand-darkblue)] text-white border-[var(--color-brand-darkblue)]'
                : 'bg-[var(--color-brand-darkblue-light)] text-[var(--color-brand-darkblue)] border-transparent hover:bg-[var(--color-brand-darkblue-hover)/10]',
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};
