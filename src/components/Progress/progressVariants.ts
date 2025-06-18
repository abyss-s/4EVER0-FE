import { cva } from 'class-variance-authority';

export const progressVariants = cva('relative w-full overflow-hidden rounded-full transition-all', {
  variants: {
    variant: {
      // 요금제용 variants
      data: 'bg-gray-100 dark:bg-gray-900/30 [&>*]:bg-orange-400 dark:[&>*]:bg-blue-400',
      call: 'bg-gray-100 dark:bg-gray-900/30 [&>*]:bg-green-400 dark:[&>*]:bg-green-400',
      sharedData: 'bg-gray-100 dark:bg-gray-900/30 [&>*]:bg-purple-400 dark:[&>*]:bg-purple-400',
      sms: 'bg-gray-100 dark:bg-gray-900/30 [&>*]:bg-pink-400 dark:[&>*]:bg-orange-400',

      // 미션용 variant
      mission: 'bg-gray-100 dark:bg-gray-900/30 [&>*]:bg-[var(--color-brand-yellow)]',

      // default variants
      default: 'bg-gray-100 dark:bg-gray-900/30 [&>*]:bg-[var(--color-brand-darkblue)]',
      secondary: 'bg-gray-100 dark:bg-gray-900/30 [&>*]:bg-secondary',
    },
    size: {
      sm: 'h-1',
      default: 'h-2',
      lg: 'h-3',
      xl: 'h-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
