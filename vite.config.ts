import { defineConfig } from 'vite'

// Use dynamic import for ESM-only plugin compatibility in some environments
export default defineConfig(async () => {
  const react = (await import('@vitejs/plugin-react')).default
  return {
    plugins: [react()],
  }
})