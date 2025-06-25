import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border border-gray-300 bg-background text-gray-700 shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 dark:hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'text-foreground hover:bg-accent hover:text-accent-foreground dark:text-foreground dark:hover:bg-accent/50 dark:hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline dark:text-primary dark:hover:text-primary/80',
        login: 'bg-[#25394B] text-white rounded-md hover:bg-[#1d2f3d]',
        missionStatus:
          'bg-gray-100 text-gray-500 border border-gray-200 rounded-[6px] px-2 py-0.5 text-xs font-semibold cursor-default dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700',
        missionStatusCom:
          'bg-black text-white rounded-[6px] px-2 py-0.5 text-xs font-semibold hover:bg-black/80 inline-flex items-center gap-1',
        map: 'w-[120px] bg-white border border-gray-200 text-gray-700 rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-shadow flex items-center justify-center gap-1.5 px-4 py-2 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600',
        yellowFull:
          'w-full mt-auto py-3 bg-[var(--color-brand-yellow)] hover:bg-[var(--color-brand-yellow-hover)] text-black rounded-md button-text font-semibold transition-colors',
        startMoonoz:
          'py-3 px-6 mt-1 bg-[var(--color-brand-yellow)] hover:bg-[var(--color-brand-yellow-hover)] text-black rounded-md font-semibold text-sm transition-colors',
        categoryFilter:
          'px-4 py-2 flex-shrink-0 whitespace-nowrap shadow-sm transition-colors rounded-full font-medium text-xs px-4 py-2 border flex items-center gap-2',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        badge: 'h-5 px-2 text-xs rounded-[6px]',
        icon: 'size-9',
        categoryFilter: 'h-12 rounded-[10px] px-6 has-[>svg]:px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
