import { cva } from 'class-variance-authority';

export const scrollbarVariants = cva('relative overflow-hidden rounded-md', {
  variants: {
    size: {
      sm: 'h-32 w-64',
      default: 'h-48 w-80',
      lg: 'h-64 w-96',
      auto: 'h-auto w-auto',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});
