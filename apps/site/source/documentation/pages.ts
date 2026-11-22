import { join } from 'node:path'

import { scanGuidelines } from './build/guidelines.js'
import { scanDocumentationContent } from './build/manifest.js'
import { buildNavigationTree, listNavigationLeaves } from './navigation.js'
import type { TDocumentationNavigationNode, TDocumentationPage } from './types.js'

/** The folder that holds the documentation pages. The build runs from the app's root. */
export const contentDirectory = join(process.cwd(), 'documentation', 'content')

/** The folder of the design guidelines, which the documentation shows as they are written. */
export const guidelinesDirectory = join(process.cwd(), '..', '..', 'guidelines')

/** Everything the site knows about its documentation. */
export interface TDocumentation {
  pages: TDocumentationPage[]
  navigationTree: TDocumentationNavigationNode[]
  readingOrder: ReturnType<typeof listNavigationLeaves>
}

let cached: Promise<TDocumentation> | undefined

/**
 * Scans the content folder and the guidelines once, and derives the tree and the reading order.
 * Server only.
 */
export function loadDocumentation(): Promise<TDocumentation> {
  cached ??= Promise.all([
    scanDocumentationContent(contentDirectory),
    scanGuidelines(guidelinesDirectory, contentDirectory),
  ]).then(([content, guidelines]) => {
    const pages = [...content, ...guidelines].sort((a, b) => a.path.localeCompare(b.path))
    const navigationTree = buildNavigationTree(pages)

    return { pages, navigationTree, readingOrder: listNavigationLeaves(navigationTree) }
  })

  return cached
}

/** Finds a page by its URL path, ignoring a trailing slash. */
export function findPage(
  pages: readonly TDocumentationPage[],
  path: string,
): TDocumentationPage | undefined {
  const clean = path.length > 1 ? path.replace(/\/+$/, '') : path

  return pages.find((page) => page.path === clean)
}
