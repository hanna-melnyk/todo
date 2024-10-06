import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // Use different targets based on the environment
        target: process.env.NODE_ENV === 'production'
            ? process.env.WEB_SERVICE_URL // Production URL from .env
            : process.env.DEVELOPMENT_SERVICE_URL, // Local development URL
        changeOrigin: true,
        secure: process.env.NODE_ENV === 'production', // Use secure proxy for production
      },
    },
    watch: {
      usePolling: true,   // Enable polling to detect file changes
    },
    hmr: true, // Ensure HMR is enabled
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase limit to 1000 KB to suppress warnings
  },

})