import { TableOfContentsRoot } from './parts/root.js'
import {
  TableOfContentsHeader,
  TableOfContentsItem,
  TableOfContentsList,
} from './parts/sections.js'
import type { TTableOfContentsRootProps } from './types.js'

import './table-of-contents.css'

export type {
  TTableOfContentsHeaderProps,
  TTableOfContentsItemProps,
  TTableOfContentsListProps,
  TTableOfContentsRootProps,
  TTableOfContentsSide,
} from './types.js'

export interface TTableOfContentsComponent extends React.ForwardRefExoticComponent<
  TTableOfContentsRootProps & React.RefAttributes<HTMLElement>
> {
  /** Navigation landmark that observes its linked sections. */
  Root: typeof TableOfContentsRoot
  /** Visible heading for the navigation landmark. */
  Header: typeof TableOfContentsHeader
  /** List container for section links; nest it inside an item for sub-sections. */
  List: typeof TableOfContentsList
  /** Section anchor and optional nested list. */
  Item: typeof TableOfContentsItem
}

/** Composable section navigation with automatic active-section tracking. */
export const TableOfContents: TTableOfContentsComponent = Object.assign(TableOfContentsRoot, {
  Root: TableOfContentsRoot,
  Header: TableOfContentsHeader,
  List: TableOfContentsList,
  Item: TableOfContentsItem,
})
