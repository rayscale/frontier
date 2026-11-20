import { Sidebar, type TTreeNode } from '@rayscale/frontier'
import type { ReactElement } from 'react'
import { useLocation } from 'react-router'

import { navigationTree, readingOrder } from '#/docs/pages.js'
import { renderSidebarSymbol } from '#/docs/symbols.js'
import type { TDocsNavigationNode } from '#/docs/types.js'

function toTreeNode(node: TDocsNavigationNode): TTreeNode {
  return {
    id: node.id,
    label: node.label,
    href: node.href,
    symbol: renderSidebarSymbol(node.symbol),
    children: node.children?.map(toTreeNode),
  }
}

const items = navigationTree.map(toTreeNode)

/** The documentation tree, with the page being read marked as current. */
export function DocsSidebarTree(): ReactElement {
  const { pathname } = useLocation()
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const activeId = readingOrder.find((leaf) => leaf.href === clean)?.id

  return <Sidebar.Tree aria-label="Documentation" items={items} activeId={activeId} />
}
