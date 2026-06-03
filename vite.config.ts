import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Must come before the React plugin so generated routes are transformed.
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
  ],
})
