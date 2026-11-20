'use client'

import { createContext, type ReactElement, type ReactNode, useContext, useMemo } from 'react'

import { buildNavigationTree, listNavigationLeaves } from '#/docs/navigation.js'
import type { TDocsPage } from '#/docs/types.js'

const docsContext = createContext<readonly TDocsPage[] | null>(null)

/** Hands the list of pages, read on the server, to the components that navigate between them. */
export function DocsProvider({
  pages,
  children,
}: {
  pages: readonly TDocsPage[]
  children: ReactNode
}): ReactElement {
  return <docsContext.Provider value={pages}>{children}</docsContext.Provider>
}

/** The pages of the documentation. Must be used inside `DocsProvider`. */
export function useDocsPages(): readonly TDocsPage[] {
  const pages = useContext(docsContext)

  if (!pages) {
    throw new Error('useDocsPages must be used inside DocsProvider.')
  }

  return pages
}

/** The navigation tree and the reading order, derived from the pages. */
export function useDocsNavigation(): {
  navigationTree: ReturnType<typeof buildNavigationTree>
  readingOrder: ReturnType<typeof listNavigationLeaves>
} {
  const pages = useDocsPages()

  return useMemo(() => {
    const navigationTree = buildNavigationTree([...pages])

    return { navigationTree, readingOrder: listNavigationLeaves(navigationTree) }
  }, [pages])
}
