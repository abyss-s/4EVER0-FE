import { cva } from 'class-variance-authority';

export const missionListVariants = cva(
  'bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700',
  {
    variants: {
      variant: {
        default: 'p-5',
        compact: 'p-3',
        spacious: 'p-6',
      },
      spacing: {
        tight:
          '[&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-gray-100 dark:[&>*:not(:last-child)]:border-gray-700 [&>*]:py-3',
        normal:
          '[&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-gray-100 dark:[&>*:not(:last-child)]:border-gray-700 [&>*]:py-5 first:[&>*]:pt-0 last:[&>*]:pb-0',
        loose:
          '[&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-gray-100 dark:[&>*:not(:last-child)]:border-gray-700 [&>*]:py-6 first:[&>*]:pt-0 last:[&>*]:pb-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      spacing: 'normal',
    },
  },
);

export const missionItemVariants = cva(
  'flex items-start gap-4 transition-colors duration-200', // items-center -> items-start로 변경
  {
    variants: {
      interactive: {
        true: 'hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer rounded-lg p-3 -m-3',
        false: '',
      },
      completed: {
        true: 'opacity-60',
        false: '',
      },
    },
    defaultVariants: {
      interactive: false,
      completed: false,
    },
  },
);

export const missionIconVariants = cva(
  'relative flex items-center justify-center flex-shrink-0 rounded-xl overflow-hidden',
  {
    variants: {
      size: {
        sm: 'w-10 h-10',
        default: 'w-12 h-12',
        lg: 'w-14 h-14',
      },
      type: {
        SHARE: 'bg-blue-100 dark:bg-blue-900/30',
        ATTENDANCE: 'bg-green-100 dark:bg-green-900/30',
        INVITE: 'bg-purple-100 dark:bg-purple-900/30',
      },
    },
    defaultVariants: {
      size: 'default',
      type: 'SHARE',
    },
  },
);

export const missionTypeTagVariants = cva(
  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
  {
    variants: {
      type: {
        SHARE: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        ATTENDANCE: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        INVITE: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      },
    },
    defaultVariants: {
      type: 'SHARE',
    },
  },
);
