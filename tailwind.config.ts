import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        'bg-dark': 'var(--color-bg-dark)',

        'brand-red': 'var(--color-brand-red)',
        'brand-red-hover': 'var(--color-brand-red-hover)',
        'brand-red-light': 'var(--color-brand-red-light)',

        'brand-yellow': 'var(--color-brand-yellow)',
        'brand-yellow-hover': 'var(--color-brand-yellow-hover)',
        'brand-yellow-light': 'var(--color-brand-yellow-light)',

        'brand-darkblue': 'var(--color-brand-darkblue)',
        'brand-darkblue-hover': 'var(--color-brand-darkblue-hover)',
        'brand-darkblue-light': 'var(--color-brand-darkblue-light)',

        positive: 'var(--color-positive)',
        'positive-bg': 'var(--color-positive-bg)',

        cautionary: 'var(--color-cautionary)',
        'cautionary-bg': 'var(--color-cautionary-bg)',

        negative: 'var(--color-negative)',
        'negative-bg': 'var(--color-negative-bg)',
      },
    },
  },
  plugins: [],
};

export default config;
