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
  type TIconComponent,
} from '@rayscale/frontier'
import type { ReactNode } from 'react'

const sidebarIcons: { [name: string]: TIconComponent | undefined } = {
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
}

/** Renders the sidebar icon named in a page's frontmatter, if the site knows it. */
export function renderSidebarIcon(name: string | undefined): ReactNode {
  const Icon = name === undefined ? undefined : sidebarIcons[name]

  return Icon ? <Icon aria-hidden="true" /> : undefined
}
