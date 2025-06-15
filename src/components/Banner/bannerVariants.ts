import { cva } from 'class-variance-authority';

export const bannerVariants = cva(
  'relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--color-brand-darkblue)] hover:bg-[var(--color-brand-darkblue-hover)] text-white dark:bg-[var(--color-brand-darkblue-hover)] dark:hover:bg-[var(--color-brand-darkblue)]',
        white:
          'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-800',
        red: 'bg-[var(--color-brand-red)] hover:bg-[var(--color-brand-red-hover)] text-white',
        yellow:
          'bg-[var(--color-brand-yellow)] hover:bg-[var(--color-brand-yellow-hover)] text-gray-900',
        moonuz:
          'bg-gradient-to-r from-[var(--color-brand-darkblue)] via-purple-600 to-[var(--color-brand-red)] text-white hover:from-[var(--color-brand-darkblue-hover)] hover:to-[var(--color-brand-red-hover)]',
        gradient:
          'bg-gradient-to-br from-[var(--color-brand-darkblue)] to-[var(--color-brand-red)] text-white hover:from-[var(--color-brand-darkblue-hover)] hover:to-[var(--color-brand-red-hover)]',
      },
      size: {
        sm: 'p-4 min-h-[80px]',
        default: 'p-6 min-h-[120px]',
        lg: 'p-8 min-h-[180px]',
      },
      layout: {
        default: 'flex items-center',
        centered: 'flex items-center justify-center text-center',
        split: 'grid grid-cols-1 md:grid-cols-2 items-center gap-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      layout: 'default',
    },
  },
);
