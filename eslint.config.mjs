// @ts-check

import eslint from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import airbnb from 'eslint-config-airbnb-typescript';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['dist/**', 'build/**', 'coverage/**', 'node_modules/**', '*.d.ts', '*.log'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...Object.fromEntries(Object.entries(globals.browser).map(([k, v]) => [k.trim(), v])),
        React: true,
        module: true,
        require: true,
        __dirname: true,
        naver: true,
        NodeJS: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...airbnb.rules,
    },
  },
];
