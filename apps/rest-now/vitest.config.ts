import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.renderer.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom', // 或 'jsdom'（需要额外安装）
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    },
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
}))
