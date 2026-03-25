import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// This checks if you are deploying to GitHub Pages
const isGithubPages = process.env.NODE_ENV === 'production';

export default defineConfig({
  // Use the repo name for GitHub, but '/' for Netlify/Local
  base: isGithubPages ? '/ZYNDEX-FULLSTACK-PROJECT/' : '/', 
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})