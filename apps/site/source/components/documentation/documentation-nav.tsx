'use client'

import { Button, Drawer, PanelLeft, Tree, type TTreeNode } from '@rayscale/frontier'
import { usePathname } from 'next/navigation'
import { type ReactElement, useMemo, useState } from 'react'

import { renderSidebarIcon } from '#/documentation/icons.js'
import type { TDocumentationNavigationNode } from '#/documentation/types.js'

import { useDocumentationNavigation } from './documentation-provider.js'

function toTreeNode(node: TDocumentationNavigationNode): TTreeNode {
  return {
    id: node.id,
    label: node.label,
    href: node.href,
    icon: renderSidebarIcon(node.icon),
    children: node.children?.map(toTreeNode),
  }
}

function DocumentationTree({
  onNavigate,
}: {
  onNavigate?: (() => void) | undefined
}): ReactElement {
  const pathname = usePathname()
  const { navigationTree, readingOrder } = useDocumentationNavigation()
  const items = useMemo(() => navigationTree.map(toTreeNode), [navigationTree])
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const activeId = readingOrder.find((leaf) => leaf.href === clean)?.id

  return (
    <Tree aria-label="Documentation" items={items} activeId={activeId} onNavigate={onNavigate} />
  )
}

/** The documentation tree as a floating panel. It is always open and hidden on narrow screens. */
export function DocumentationNav(): ReactElement {
  return (
    <nav className="documentation-nav" aria-label="Documentation">
      <DocumentationTree />
    </nav>
  )
}

/** On narrow screens, a button that opens the documentation tree in a drawer. */
export function DocumentationNavDrawer(): ReactElement {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen} side="left">
      <Drawer.Trigger>
        <Button variant="ghost" size="small" className="documentation-nav-trigger">
          <PanelLeft aria-hidden="true" />
          Menu
        </Button>
      </Drawer.Trigger>
      <Drawer.Content size="small">
        <Drawer.Header>
          <Drawer.Title>Documentation</Drawer.Title>
        </Drawer.Header>
        <DocumentationTree
          onNavigate={() => {
            setOpen(false)
          }}
        />
      </Drawer.Content>
    </Drawer>
  )
}
