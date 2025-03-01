import { defineConfig } from 'vite'
import path from 'path'

const resolvePath = (alias: string) => path.resolve(__dirname, alias)

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      '@': resolvePath('./src'),
      '@assets': resolvePath('./src/assets'),
      '@frontend': resolvePath('./src/frontend'),
      '@backend': resolvePath('./src/backend'),
      '@database': resolvePath('./src/database'),
    },
  },
  build: {
    rollupOptions: {
      external: ['knex'],
    },
  },
})
