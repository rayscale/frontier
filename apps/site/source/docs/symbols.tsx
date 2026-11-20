import { Box, Home, Italic, LayoutGrid, Sparkles, type TSymbolComponent } from '@rayscale/frontier'
import type { ReactNode } from 'react'

const sidebarSymbols: { [name: string]: TSymbolComponent | undefined } = {
  box: Box,
  home: Home,
  italic: Italic,
  'layout-grid': LayoutGrid,
  sparkles: Sparkles,
}

/** Renders the sidebar symbol named in a page's frontmatter, if the site knows it. */
export function renderSidebarSymbol(name: string | undefined): ReactNode {
  const Symbol = name === undefined ? undefined : sidebarSymbols[name]

  return Symbol ? <Symbol aria-hidden="true" /> : undefined
}
