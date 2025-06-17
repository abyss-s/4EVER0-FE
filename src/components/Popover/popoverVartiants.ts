import { cva } from 'class-variance-authority';

export const contentVariants = cva('z-50 rounded-md border p-4 shadow-md', {
  variants: {
    variant: {
      light: 'bg-white border-gray-200 text-gray-900 shadow-lg',
      dark: 'bg-gray-900 border-gray-700 text-gray-100 shadow-black/50',
    },
  },
  defaultVariants: {
    variant: 'light',
  },
});

export const arrowVariants = cva('fill-current', {
  variants: {
    variant: {
      light: 'text-white',
      dark: 'text-gray-900',
    },
  },
  defaultVariants: {
    variant: 'light',
  },
});
