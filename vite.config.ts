import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  preview: {
    host: '0.0.0.0',
    port: 10000,
    strictPort: true,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  }
})