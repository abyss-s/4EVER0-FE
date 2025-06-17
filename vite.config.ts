import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
// import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    // visualizer({ open: true })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['@tanstack/react-query', 'axios', 'zustand'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-popover', 'lucide-react'],
          markdown: ['micromark', 'vfile', 'mdast-util-to-hast'],
        },
      },
    },
  },
});
