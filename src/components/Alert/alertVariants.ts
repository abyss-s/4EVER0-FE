import { cva } from 'class-variance-authority';

export const alertVariants = cva('relative w-full rounded-lg border p-4 text-sm', {
  variants: {
    variant: {
      default: 'bg-muted text-muted-foreground',
      destructive: 'bg-red-50 text-red-700 border-red-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
