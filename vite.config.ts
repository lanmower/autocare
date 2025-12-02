import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Manual CMS configuration - the plugin was causing issues with config parsing
  ],
  base: process.env.NODE_ENV === 'production' ? '/autocare/' : '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Serve content files statically from public directory
  publicDir: 'public',
  server: {
    // Add proxy configuration for CMS backend
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
