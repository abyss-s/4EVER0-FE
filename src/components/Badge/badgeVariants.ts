import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        // 구독 관련 variant
        subscription: 'border-transparent bg-pink-500 text-white shadow hover:bg-pink-600',
        category: 'border-pink-200 bg-pink-50 text-pink-700 hover:bg-pink-100',
        step: 'border-pink-200 bg-transparent text-pink-600 hover:bg-pink-50',
        // OTT 카테고리별
        ott: 'border-purple-200 bg-purple-50 text-purple-700',
        music: 'border-blue-200 bg-blue-50 text-blue-700',
        webtoon: 'border-green-200 bg-green-50 text-green-700',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
