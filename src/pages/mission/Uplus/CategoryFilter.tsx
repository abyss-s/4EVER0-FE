import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

const BRAND_CATEGORIES: { value: string; label: string }[] = [
  { value: '전체', label: '전체' },
  { value: '디저트/음료', label: '디저트/음료' },
  { value: '편의점/쇼핑', label: '편의점/쇼핑' },
  { value: '카페/음료', label: '카페/음료' },
  { value: '베이커리', label: '베이커리' },
  { value: '도서/콘텐츠', label: '도서/콘텐츠' },
];

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
