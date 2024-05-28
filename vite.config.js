import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@Components': resolve(__dirname, 'src/components'),
      '@Assets': resolve(__dirname, 'src/assets'),
      '@Pages': resolve(__dirname, 'src/pages'),
      '@Router': resolve(__dirname, 'src/router'),
      '@Context': resolve(__dirname, 'src/context'),
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
    },
    postcss: {
      plugins: [
        autoprefixer({})
      ],
    }
  }
});
