import type { HTMLAttributes, ReactNode } from 'react'

/** A node in a navigation tree. */
export interface TTreeNode {
  /** Unique, stable identifier used for state and keyboard focus. */
  id: string
  /** Visible label. */
  label: ReactNode
  /** Optional destination. Leaves with an href render as native links. */
  href?: string | undefined
  /** Optional symbol displayed before the label. */
  symbol?: ReactNode | undefined
  /** Nested destinations. Presence makes the node a disclosure branch. */
  children?: TTreeNode[] | undefined
  /** Prevents interaction with the node. */
  disabled?: boolean | undefined
  /** Plain text used for typeahead when the label is not a string. */
  textValue?: string | undefined
}

export type TTreeProps = Omit<HTMLAttributes<HTMLUListElement>, 'children'> & {
  /** Top-level nodes. */
  items: TTreeNode[]
  /** Current destination, matched against `TTreeNode.id`. */
  activeId?: string | undefined
  /** Expanded node ids in controlled mode. */
  expandedIds?: string[] | undefined
  /** Initial expanded node ids in uncontrolled mode. */
  defaultExpandedIds?: string[] | undefined
  /** Called whenever a branch is expanded or collapsed. */
  onExpandedChange?: ((ids: string[]) => void) | undefined
  /**
   * Expands the ancestors of `activeId`. Defaults to `true`.
   */
  autoExpandActive?: boolean | undefined
  /**
   * Enables tooltips for symbol-only presentation. `Sidebar.Tree` sets it from
   * the sidebar's collapsed state.
   */
  compact?: boolean | undefined
  /** Called when a link destination is activated. */
  onNavigate?: ((node: TTreeNode) => void) | undefined
  /** Called when a branch is clicked in compact mode. */
  onCompactBranchClick?: (() => void) | undefined
  /** Called when an action leaf without an href is activated. */
  onAction?: ((node: TTreeNode) => void) | undefined
}
