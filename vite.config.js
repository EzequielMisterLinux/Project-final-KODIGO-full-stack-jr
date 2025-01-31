import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({

  base: process.env.NODE_ENV === 'production' 
  ? 'https://project-final-kodigo-full-stack-production.up.railway.app/' 
  : '/',
build: {
  manifest: true, // Generar manifest para cache
},

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
});