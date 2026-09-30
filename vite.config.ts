import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://luigip11.github.io/My-Portfolio/
  base: '/My-Portfolio/',
  plugins: [react(), tailwindcss()],
})
