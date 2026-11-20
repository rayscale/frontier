'use client'

import { Box, Home, LayoutGrid, Shapes, type TSymbolComponent, Typeface } from '@rayscale/frontier'
import type { ReactNode } from 'react'

const sidebarSymbols: { [name: string]: TSymbolComponent | undefined } = {
  box: Box,
  home: Home,
  'layout-grid': LayoutGrid,
  shapes: Shapes,
  typeface: Typeface,
}

/** Renders the sidebar symbol named in a page's frontmatter, if the site knows it. */
export function renderSidebarSymbol(name: string | undefined): ReactNode {
  const Symbol = name === undefined ? undefined : sidebarSymbols[name]

  return Symbol ? <Symbol aria-hidden="true" /> : undefined
}
