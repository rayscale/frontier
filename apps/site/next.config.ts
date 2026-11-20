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
  // Next blocks the scripts of the dev server for any origin but localhost, so a phone on the local
  // network would get the HTML and no JavaScript. These are the private network ranges.
  allowedDevOrigins: ['192.168.*.*', '10.*.*.*', '172.16.*.*', '*.local'],
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
