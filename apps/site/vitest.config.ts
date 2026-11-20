import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'

const sourceDirectory = fileURLToPath(new URL('./source', import.meta.url))

export default defineConfig({
  resolve: {
    alias: [{ find: /^#\//, replacement: `${sourceDirectory}/` }],
  },
  // Next compiles JSX itself and keeps `jsx: preserve` in the tsconfig, so tests ask for it here.
  oxc: { jsx: { runtime: 'automatic' } },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['source/**/*.test.{ts,tsx}'],
  },
})
