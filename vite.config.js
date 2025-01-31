import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/css/app.css',
        'resources/js/main.jsx',
      ],
      refresh: true,
    }),
    react(),
  ],
  server: {
    https: true,
    host: true,
  },
  // Force generation of HTTPS URLs in production
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    assetsDir: '',
    manifest: true,
  },
});