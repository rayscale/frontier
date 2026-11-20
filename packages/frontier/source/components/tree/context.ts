import { createContext, useContext } from 'react'

import type { TTreeNode } from './types.js'

export interface TTreeContextValue {
  compact: boolean
  expanded: Set<string>
  focusId: string | null
  setFocusId: (id: string) => void
  setExpanded: (id: string, open: boolean) => void
  activeId?: string | undefined
  onNavigate?: ((node: TTreeNode) => void) | undefined
  onCompactBranchClick?: (() => void) | undefined
  onAction?: ((node: TTreeNode) => void) | undefined
  tabbableId?: string | undefined
}

export const treeContext = createContext<TTreeContextValue | null>(null)

/** Internal: a surrounding component can own the highlight surface. */
export const treeHighlightContext = createContext(true)

export function useTreeContext(component: string): TTreeContextValue {
  const context = useContext(treeContext)

  if (!context) {
    throw new Error(`Tree: ${component} must be used within <Tree>.`)
  }

  return context
}
