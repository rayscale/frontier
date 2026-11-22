import type {
  TDocumentationBreadcrumb,
  TDocumentationNavigationNode,
  TDocumentationNeighbour,
  TDocumentationPage,
} from './types.js'

const rootPath = '/documentation'

interface TTrieNode {
  segment: string
  path: string
  children: Map<string, TTrieNode>
  page?: TDocumentationPage | undefined
}

function segmentsOf(path: string): string[] {
  return path.split('/').slice(2).filter(Boolean)
}

function sentenceCase(segment: string): string {
  const words = segment.replaceAll('-', ' ')

  return words.charAt(0).toUpperCase() + words.slice(1)
}

function createTrieNode(segment: string, path: string): TTrieNode {
  return { segment, path, children: new Map() }
}

function insert(root: TTrieNode, page: TDocumentationPage): void {
  let node = root

  for (const segment of segmentsOf(page.path)) {
    const path = `${node.path}/${segment}`
    const existing = node.children.get(segment)
    const next = existing ?? createTrieNode(segment, path)

    node.children.set(segment, next)
    node = next
  }

  node.page = page
}

function orderOf(node: TDocumentationNavigationNode, orders: Map<string, number>): number {
  return orders.get(node.id) ?? Number.POSITIVE_INFINITY
}

function sortNodes(nodes: TDocumentationNavigationNode[], orders: Map<string, number>): void {
  nodes.sort((a, b) => {
    const difference = orderOf(a, orders) - orderOf(b, orders)

    if (difference !== 0 && !Number.isNaN(difference)) {
      return difference
    }

    return a.label.localeCompare(b.label)
  })
}

function toNode(trie: TTrieNode, orders: Map<string, number>): TDocumentationNavigationNode {
  const { page } = trie
  const label = page?.frontmatter.title ?? sentenceCase(trie.segment)
  const base: TDocumentationNavigationNode = { id: trie.path, label }

  if (page?.frontmatter.icon) {
    base.icon = page.frontmatter.icon
  }

  if (page?.frontmatter.status) {
    base.status = page.frontmatter.status
  }

  if (page?.frontmatter.order !== undefined) {
    orders.set(base.id, page.frontmatter.order)
  }

  if (trie.children.size === 0) {
    return { ...base, href: trie.path }
  }

  const children = [...trie.children.values()].map((child) => toNode(child, orders))

  sortNodes(children, orders)

  if (page) {
    children.unshift({ id: `${trie.path}#overview`, label: 'Overview', href: trie.path })
  }

  return { ...base, children }
}

/**
 * Builds the sidebar tree from the pages. A folder becomes a section. A
 * section that also has a page of its own gets an `Overview` leaf first, so
 * a row never toggles and navigates at once.
 */
export function buildNavigationTree(pages: TDocumentationPage[]): TDocumentationNavigationNode[] {
  const root = createTrieNode('', rootPath)
  const orders = new Map<string, number>()
  const visible = pages.filter((page) => page.frontmatter.sidebar !== false)
  const rootPage = visible.find((page) => page.path === rootPath)

  for (const page of visible) {
    if (page.path !== rootPath) {
      insert(root, page)
    }
  }

  const nodes = [...root.children.values()].map((child) => toNode(child, orders))

  if (rootPage) {
    const rootNode: TDocumentationNavigationNode = {
      id: rootPage.path,
      label: rootPage.frontmatter.title,
      href: rootPage.path,
    }

    if (rootPage.frontmatter.icon) {
      rootNode.icon = rootPage.frontmatter.icon
    }

    orders.set(rootNode.id, rootPage.frontmatter.order ?? 0)
    nodes.push(rootNode)
  }

  sortNodes(nodes, orders)

  return nodes
}

/** Lists the destinations of the tree in reading order. */
export function listNavigationLeaves(
  tree: TDocumentationNavigationNode[],
): (TDocumentationNavigationNode & { href: string })[] {
  const leaves: (TDocumentationNavigationNode & { href: string })[] = []

  for (const node of tree) {
    if (node.href !== undefined) {
      leaves.push({ ...node, href: node.href })
    }

    if (node.children) {
      leaves.push(...listNavigationLeaves(node.children))
    }
  }

  return leaves
}

/** Finds the pages around a path in reading order. */
export function getNeighbours(
  leaves: { label: string; href: string }[],
  path: string,
): { previous?: TDocumentationNeighbour; next?: TDocumentationNeighbour } {
  const index = leaves.findIndex((leaf) => leaf.href === path)

  if (index === -1) {
    return {}
  }

  const result: { previous?: TDocumentationNeighbour; next?: TDocumentationNeighbour } = {}
  const previous = leaves[index - 1]
  const next = leaves[index + 1]

  if (previous) {
    result.previous = { label: previous.label, href: previous.href }
  }

  if (next) {
    result.next = { label: next.label, href: next.href }
  }

  return result
}

/** Lists the trail from the documentation root to a page. */
export function getBreadcrumbs(
  pages: TDocumentationPage[],
  path: string,
): TDocumentationBreadcrumb[] {
  const trail: TDocumentationBreadcrumb[] = [{ label: 'Documentation', href: rootPath }]
  let current = rootPath

  for (const segment of segmentsOf(path)) {
    current = `${current}/${segment}`
    const match = pages.find((page) => page.path === current)

    trail.push({ label: match?.frontmatter.title ?? sentenceCase(segment), href: current })
  }

  return trail
}
