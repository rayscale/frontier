import { createContext, useContext } from 'react'

import type { TDocsPage } from '#/docs/types.js'

export const docsPageContext = createContext<TDocsPage | null>(null)

/** Returns the page being rendered. Must be used inside a documentation page. */
export function useDocsPage(): TDocsPage {
  const page = useContext(docsPageContext)

  if (!page) {
    throw new Error('useDocsPage must be used inside a documentation page.')
  }

  return page
}
