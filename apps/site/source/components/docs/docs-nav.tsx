'use client'

import { Button, Drawer, PanelLeft, Tree, type TTreeNode } from '@rayscale/frontier'
import { usePathname } from 'next/navigation'
import { type ReactElement, useMemo, useState } from 'react'

import { renderSidebarSymbol } from '#/docs/symbols.js'
import type { TDocsNavigationNode } from '#/docs/types.js'

import { useDocsNavigation } from './docs-provider.js'

function toTreeNode(node: TDocsNavigationNode): TTreeNode {
  return {
    id: node.id,
    label: node.label,
    href: node.href,
    symbol: renderSidebarSymbol(node.symbol),
    children: node.children?.map(toTreeNode),
  }
}

function DocsTree({ onNavigate }: { onNavigate?: (() => void) | undefined }): ReactElement {
  const pathname = usePathname()
  const { navigationTree, readingOrder } = useDocsNavigation()
  const items = useMemo(() => navigationTree.map(toTreeNode), [navigationTree])
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const activeId = readingOrder.find((leaf) => leaf.href === clean)?.id

  return (
    <Tree aria-label="Documentation" items={items} activeId={activeId} onNavigate={onNavigate} />
  )
}

/** The documentation tree as a floating panel. It is always open and hidden on narrow screens. */
export function DocsNav(): ReactElement {
  return (
    <nav className="docs-nav" aria-label="Documentation">
      <DocsTree />
    </nav>
  )
}

/** On narrow screens, a button that opens the documentation tree in a drawer. */
export function DocsNavDrawer(): ReactElement {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen} side="left">
      <Drawer.Trigger>
        <Button variant="ghost" size="small" className="docs-nav-trigger">
          <PanelLeft aria-hidden="true" />
          Menu
        </Button>
      </Drawer.Trigger>
      <Drawer.Content size="small">
        <Drawer.Header>
          <Drawer.Title>Documentation</Drawer.Title>
        </Drawer.Header>
        <DocsTree
          onNavigate={() => {
            setOpen(false)
          }}
        />
      </Drawer.Content>
    </Drawer>
  )
}
