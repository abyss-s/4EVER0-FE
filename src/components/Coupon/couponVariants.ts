import { cva } from 'class-variance-authority';

export const couponVariants = cva(
  'w-20 flex flex-col items-center justify-center px-1 text-sm text-white text-center whitespace-pre',
  {
    variants: {
      type: {
        owned: 'bg-[#c0c0c0]',
        hot: 'bg-[#5ebcbc]',
        hotUrgent: 'bg-[#5ebcbc]',
        liked: 'bg-pink-400',
      },
    },
    defaultVariants: {
      type: 'owned',
    },
  },
);
