import { join } from 'node:path'

import { themeMetadata } from '@rayscale/frontier/theme-metadata'

import { scanGuidelines } from './build/guidelines.js'
import { scanDocsContent } from './build/manifest.js'
import { themePages } from './build/themes.js'
import { buildNavigationTree, listNavigationLeaves } from './navigation.js'
import type { TDocsNavigationNode, TDocsPage } from './types.js'

/** The folder that holds the documentation pages. The build runs from the app's root. */
export const contentDirectory = join(process.cwd(), 'content')

/** The folder of the design guidelines, which the documentation shows as they are written. */
export const guidelinesDirectory = join(process.cwd(), '..', '..', 'guidelines')

/** Everything the site knows about its documentation. */
export interface TDocs {
  pages: TDocsPage[]
  navigationTree: TDocsNavigationNode[]
  readingOrder: ReturnType<typeof listNavigationLeaves>
}

let cached: Promise<TDocs> | undefined

/**
 * Scans the content folder and the guidelines once, adds a page for each theme of the package, and
 * derives the tree and the reading order. Server only.
 */
export function loadDocs(): Promise<TDocs> {
  cached ??= Promise.all([
    scanDocsContent(contentDirectory),
    scanGuidelines(guidelinesDirectory, contentDirectory),
  ]).then(([content, guidelines]) => {
    const pages = [...content, ...guidelines, ...themePages(themeMetadata)].sort((a, b) =>
      a.path.localeCompare(b.path),
    )
    const navigationTree = buildNavigationTree(pages)

    return { pages, navigationTree, readingOrder: listNavigationLeaves(navigationTree) }
  })

  return cached
}

/** Finds a page by its URL path, ignoring a trailing slash. */
export function findPage(pages: readonly TDocsPage[], path: string): TDocsPage | undefined {
  const clean = path.length > 1 ? path.replace(/\/+$/, '') : path

  return pages.find((page) => page.path === clean)
}
