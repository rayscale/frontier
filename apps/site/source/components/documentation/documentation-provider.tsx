'use client'

import { createContext, type ReactElement, type ReactNode, useContext, useMemo } from 'react'

import { buildNavigationTree, listNavigationLeaves } from '#/documentation/navigation.js'
import type { TDocumentationPage } from '#/documentation/types.js'

const documentationContext = createContext<readonly TDocumentationPage[] | null>(null)

/** Hands the list of pages, read on the server, to the components that navigate between them. */
export function DocumentationProvider({
  pages,
  children,
}: {
  pages: readonly TDocumentationPage[]
  children: ReactNode
}): ReactElement {
  return <documentationContext.Provider value={pages}>{children}</documentationContext.Provider>
}

/** The pages of the documentation. Must be used inside `DocumentationProvider`. */
export function useDocumentationPages(): readonly TDocumentationPage[] {
  const pages = useContext(documentationContext)

  if (!pages) {
    throw new Error('useDocumentationPages must be used inside DocumentationProvider.')
  }

  return pages
}

/** The navigation tree and the reading order, derived from the pages. */
export function useDocumentationNavigation(): {
  navigationTree: ReturnType<typeof buildNavigationTree>
  readingOrder: ReturnType<typeof listNavigationLeaves>
} {
  const pages = useDocumentationPages()

  return useMemo(() => {
    const navigationTree = buildNavigationTree([...pages])

    return { navigationTree, readingOrder: listNavigationLeaves(navigationTree) }
  }, [pages])
}
