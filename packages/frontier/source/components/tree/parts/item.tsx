'use client'

import { type ReactElement, type ReactNode, useId, useState } from 'react'

import { ChevronDown } from '../../../icons/index.js'
import { Collapsible } from '../../collapsible/collapsible.js'
import { Tooltip } from '../../tooltip/tooltip.js'
import { useTreeContext } from '../context.js'
import { getNodeText } from '../helpers/tree.js'
import type { TTreeNode } from '../types.js'

function RowContent({ branch, node }: { branch: boolean; node: TTreeNode }): ReactNode {
  return (
    <>
      {node.icon ? (
        <span aria-hidden="true" className="frontier-tree__icon">
          {node.icon}
        </span>
      ) : null}
      <span className="frontier-tree__label">{node.label}</span>
      {branch ? <ChevronDown aria-hidden="true" className="frontier-tree__chevron" /> : null}
    </>
  )
}

function MaybeTooltip({
  compact,
  text,
  children,
}: {
  compact: boolean
  text: string
  children: ReactElement<{ 'aria-describedby'?: string }>
}): ReactElement {
  if (!compact) {
    return children
  }

  return (
    <Tooltip content={text} placement="right">
      {children}
    </Tooltip>
  )
}

export interface TTreeItemProps {
  node: TTreeNode
  level: number
}

/** Renders one navigation tree node and, recursively, its children. */
export function TreeItem({ node, level }: TTreeItemProps): ReactElement {
  const {
    activeId,
    compact,
    currentId,
    expanded,
    onAction,
    onNavigate,
    onCompactBranchClick,
    setExpanded,
    tabbableId,
  } = useTreeContext('TreeItem')
  const [beenOpened, setHasBeenOpened] = useState(false)
  const contentId = useId()

  const branch = Boolean(node.children && node.children.length > 0)
  const expandedState = expanded.has(node.id)
  const active = activeId === node.id
  const text = getNodeText(node) || node.id
  const rowProps = {
    'data-tree-level': level,
    'data-tree-id': node.id,
    'data-tree-row': '',
    'data-tree-text': text,
    tabIndex: !node.disabled && node.id === tabbableId ? 0 : -1,
  }

  if (branch) {
    const trigger = (
      <button
        {...rowProps}
        aria-controls={contentId}
        aria-disabled={node.disabled ? true : undefined}
        aria-expanded={compact ? false : expandedState}
        className="frontier-tree__row frontier-tree__row--branch"
        data-current={node.id === currentId ? '' : undefined}
        disabled={node.disabled}
        onClick={() => {
          if (compact) {
            onCompactBranchClick?.()
            return
          }

          // Mark the branch on every toggle, so a branch that starts open can
          // also play its exit the first time it closes.
          setHasBeenOpened(true)
          setExpanded(node.id, !expandedState)
        }}
        type="button"
      >
        <RowContent branch node={node} />
      </button>
    )

    return (
      <li className="frontier-tree__item">
        <Collapsible.Root
          className="frontier-tree__branch"
          data-tree-stagger={beenOpened ? 'true' : undefined}
          open={expandedState}
        >
          <MaybeTooltip compact={compact} text={text}>
            {trigger}
          </MaybeTooltip>
          <Collapsible.Content className="frontier-tree__group-content" id={contentId}>
            <ul className="frontier-tree__group" hidden={compact || undefined}>
              {node.children?.map((child) => (
                <TreeItem key={child.id} level={level + 1} node={child} />
              ))}
            </ul>
          </Collapsible.Content>
        </Collapsible.Root>
      </li>
    )
  }

  const content = <RowContent branch={false} node={node} />

  if (node.href) {
    const row = (
      <a
        {...rowProps}
        aria-current={active ? 'page' : undefined}
        aria-disabled={node.disabled ? true : undefined}
        className="frontier-tree__row"
        data-current={node.id === currentId ? '' : undefined}
        href={node.disabled ? undefined : node.href}
        onClick={(event) => {
          if (node.disabled) {
            event.preventDefault()
            return
          }

          onNavigate?.(node)
        }}
      >
        {content}
      </a>
    )

    return (
      <li className="frontier-tree__item">
        <MaybeTooltip compact={compact} text={text}>
          {row}
        </MaybeTooltip>
      </li>
    )
  }

  if (onAction) {
    const row = (
      <button
        {...rowProps}
        aria-disabled={node.disabled ? true : undefined}
        className="frontier-tree__row"
        disabled={node.disabled}
        onClick={() => {
          onAction(node)
        }}
        type="button"
      >
        {content}
      </button>
    )

    return (
      <li className="frontier-tree__item">
        <MaybeTooltip compact={compact} text={text}>
          {row}
        </MaybeTooltip>
      </li>
    )
  }

  return (
    <li className="frontier-tree__item">
      <div {...rowProps} aria-disabled="true" className="frontier-tree__row" tabIndex={-1}>
        {content}
      </div>
    </li>
  )
}
