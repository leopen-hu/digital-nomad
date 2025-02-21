import { defineConfig } from 'vite'
import path from 'path'

const resolvePath = (alias: string) => path.resolve(__dirname, alias)

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      '@': resolvePath('./src'),
    },
  },
})
