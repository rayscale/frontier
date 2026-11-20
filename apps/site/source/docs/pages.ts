import type { MDXComponents } from 'mdx/types'
import { type ComponentType, lazy, type LazyExoticComponent } from 'react'
import manifest from 'virtual:docs-manifest'

import { buildNavigationTree, listNavigationLeaves } from './navigation.js'
import type { TDocsPage } from './types.js'

type TContent = ComponentType<{ components?: MDXComponents }>

const loaders = import.meta.glob<{ default: TContent }>('/content/**/index.mdx')
const cache = new Map<string, LazyExoticComponent<TContent>>()

/** Every documentation page the build found. */
export const pages: TDocsPage[] = manifest

/** The sidebar tree. */
export const navigationTree = buildNavigationTree(pages)

/** The destinations of the tree in reading order. */
export const readingOrder = listNavigationLeaves(navigationTree)

/** Finds a page by its URL path, ignoring a trailing slash. */
export function findPage(path: string): TDocsPage | undefined {
  const clean = path.length > 1 ? path.replace(/\/+$/, '') : path

  return pages.find((page) => page.path === clean)
}

/** Returns the lazily loaded content of a page. The same component is returned for every call. */
export function getPageContent(page: TDocsPage): LazyExoticComponent<TContent> {
  const cached = cache.get(page.path)

  if (cached) {
    return cached
  }

  const load = loaders[`/content/${page.file}`]

  if (!load) {
    throw new Error(`${page.file}: the content file is not available.`)
  }

  const content = lazy(load)

  cache.set(page.path, content)

  return content
}
