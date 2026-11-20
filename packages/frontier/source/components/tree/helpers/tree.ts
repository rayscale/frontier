import type { TTreeNode } from '../types.js'

/** Returns the labels that lead to the active node, from the root down. */
export function getAncestorIds(items: TTreeNode[], activeId: string): string[] {
  function walk(nodes: TTreeNode[], ancestors: string[]): string[] | null {
    for (const node of nodes) {
      if (node.id === activeId) {
        return ancestors
      }

      if (node.children && node.children.length > 0) {
        const found = walk(node.children, [...ancestors, node.id])

        if (found) {
          return found
        }
      }
    }

    return null
  }

  return walk(items, []) ?? []
}

/** Returns the first node id in document order. */
export function findFirstId(items: TTreeNode[]): string | undefined {
  return items[0]?.id
}

/** Returns the plain text used for typeahead and tooltips. */
export function getNodeText(node: TTreeNode): string {
  if (node.textValue) {
    return node.textValue
  }

  if (typeof node.label === 'string') {
    return node.label
  }

  return node.id
}
