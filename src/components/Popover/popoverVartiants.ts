import { cva } from 'class-variance-authority';

export const contentVariants = cva('z-50 rounded-md border bg-white p-4 shadow-md', {
  variants: {
    variant: {
      light: 'border-gray-200 text-gray-900',
      dark: 'border-gray-700 bg-gray-900 text-gray-100',
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
