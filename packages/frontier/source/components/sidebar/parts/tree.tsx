import { forwardRef } from 'react'

import { treeHighlightContext } from '../../tree/context.js'
import { Tree } from '../../tree/tree.js'
import { useSidebarContext } from '../context.js'
import type { TSidebarTreeProps } from '../types.js'

/** A navigation tree that inherits the sidebar's collapsed and mobile state. */
export const SidebarTree = forwardRef<HTMLUListElement, TSidebarTreeProps>(function SidebarTree(
  { onNavigate, ...props },
  ref,
) {
  const { mobile, open, setMobileOpen, setOpen } = useSidebarContext('Sidebar.Tree')
  const compact = !open && !mobile

  return (
    <treeHighlightContext.Provider value={false}>
      <Tree
        {...props}
        ref={ref}
        compact={compact}
        onCompactBranchClick={() => {
          setOpen(true)
        }}
        onNavigate={(node) => {
          if (mobile) {
            setMobileOpen(false)
          }

          onNavigate?.(node)
        }}
      />
    </treeHighlightContext.Provider>
  )
})
