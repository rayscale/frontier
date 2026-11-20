import { fileURLToPath } from 'node:url'

import type { NextConfig } from 'next'

/** The part of the webpack configuration that this file changes. */
interface TWebpackConfig {
  resolve?: { extensionAlias?: { [extension: string]: string[] } }
}

const repositoryRoot = fileURLToPath(new URL('../..', import.meta.url))

const config: NextConfig = {
  // The site is plain files: every page is rendered at build time.
  output: 'export',
  reactStrictMode: true,
  images: { unoptimized: true },
  // The workspace package lives outside this app, so tracing and bundling start at the repository.
  outputFileTracingRoot: repositoryRoot,
  turbopack: { root: repositoryRoot },
  // The sources import TypeScript files with a `.js` extension, as the rest of the repository does.
  webpack(webpack: TWebpackConfig) {
    webpack.resolve ??= {}
    webpack.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpack
  },
}

export default config
