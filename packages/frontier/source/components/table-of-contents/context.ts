import { createContext, useContext } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'

import type { TTableOfContentsSide } from './types.js'

export interface TTableOfContentsContextValue {
  activeId: string | null
  handleLinkClick: (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => void
  prefersReducedMotion: boolean
  side: TTableOfContentsSide
}

export const tableOfContentsContext = createContext<TTableOfContentsContextValue | null>(null)

export function useTableOfContentsContext(): TTableOfContentsContextValue {
  const context = useContext(tableOfContentsContext)
  if (!context) {
    throw new Error('TableOfContents.Item must be rendered inside TableOfContents.Root.')
  }

  return context
}
