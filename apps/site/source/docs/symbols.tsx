'use client'

import {
  Bell,
  Book,
  CheckCircle,
  Compass,
  Download,
  FileText,
  Home,
  Layers,
  LayoutGrid,
  Pointer,
  Shapes,
  SquarePen,
  type TSymbolComponent,
  Typeface,
} from '@rayscale/frontier'
import type { ReactNode } from 'react'

const sidebarSymbols: { [name: string]: TSymbolComponent | undefined } = {
  bell: Bell,
  book: Book,
  'check-circle': CheckCircle,
  compass: Compass,
  download: Download,
  'file-text': FileText,
  home: Home,
  layers: Layers,
  'layout-grid': LayoutGrid,
  pointer: Pointer,
  shapes: Shapes,
  'square-pen': SquarePen,
  typeface: Typeface,
}

/** Renders the sidebar symbol named in a page's frontmatter, if the site knows it. */
export function renderSidebarSymbol(name: string | undefined): ReactNode {
  const Symbol = name === undefined ? undefined : sidebarSymbols[name]

  return Symbol ? <Symbol aria-hidden="true" /> : undefined
}
