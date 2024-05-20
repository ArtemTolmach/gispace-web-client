import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@Components': resolve(__dirname, 'src/components'),
      '@Assets': resolve(__dirname, 'src/assets'),
      '@Pages': resolve(__dirname, 'src/pages'),
      '@Router': resolve(__dirname, 'src/router'),
      '@Utils': resolve(__dirname, 'src/utils'),
      '@So_on': resolve(__dirname, 'src/so_on')
    }
  },
  server: {
    host: 'localhost',
    port: 3000,
  },
  css: {
    devSourcemap: true,
    modules: {
      scopeBehaviour: 'local'
    }
  }
});
