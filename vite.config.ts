import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/confi/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
