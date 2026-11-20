import type { Plugin } from 'vite'

import { scanDocsContent } from './manifest.js'

const virtualId = 'virtual:docs-manifest'
const resolvedId = `\0${virtualId}`

/**
 * Exposes the documentation pages as the `virtual:docs-manifest` module and
 * reloads the page when a content file is added, removed, or edited.
 */
export function docsManifest(options: { directory: string }): Plugin {
  return {
    name: 'frontier:docs-manifest',
    resolveId(id) {
      return id === virtualId ? resolvedId : undefined
    },
    async load(id) {
      if (id !== resolvedId) {
        return undefined
      }

      const pages = await scanDocsContent(options.directory)

      return `export default ${JSON.stringify(pages)}`
    },
    configureServer(server) {
      server.watcher.add(options.directory)

      const refresh = (file: string): void => {
        if (!file.endsWith('.mdx') || !file.startsWith(options.directory)) {
          return
        }

        const module = server.moduleGraph.getModuleById(resolvedId)

        if (module) {
          server.moduleGraph.invalidateModule(module)
        }

        server.ws.send({ type: 'full-reload' })
      }

      server.watcher.on('add', refresh).on('unlink', refresh).on('change', refresh)
    },
  }
}
