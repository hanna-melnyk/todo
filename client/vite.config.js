import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Forward API requests to backend
        changeOrigin: true
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