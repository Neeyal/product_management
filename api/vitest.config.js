import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['**/__tests__/**/*.{js,mjs,cjs,ts}', '**/?(*.){test,spec}.{js,mjs,cjs,ts}'],
  },
})
