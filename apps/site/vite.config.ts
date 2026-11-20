import { fileURLToPath } from 'node:url'

import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vitest/config'

import { docsManifest } from './source/docs/build/plugin.js'

const contentDirectory = fileURLToPath(new URL('./content', import.meta.url))
const sourceDirectory = fileURLToPath(new URL('./source', import.meta.url))

export default defineConfig({
  resolve: {
    alias: [{ find: /^#\//, replacement: `${sourceDirectory}/` }],
  },
  plugins: [
    docsManifest({ directory: contentDirectory }),
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: 'frontmatter' }],
          remarkGfm,
        ],
        rehypePlugins: [rehypeSlug],
      }),
    },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['source/**/*.test.{ts,tsx}'],
  },
})
