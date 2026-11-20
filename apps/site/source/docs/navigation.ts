import type { TDocsBreadcrumb, TDocsNavigationNode, TDocsNeighbour, TDocsPage } from './types.js'

const rootPath = '/docs'

interface TTrieNode {
  segment: string
  path: string
  children: Map<string, TTrieNode>
  page?: TDocsPage | undefined
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

function insert(root: TTrieNode, page: TDocsPage): void {
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

function orderOf(node: TDocsNavigationNode, orders: Map<string, number>): number {
  return orders.get(node.id) ?? Number.POSITIVE_INFINITY
}

function sortNodes(nodes: TDocsNavigationNode[], orders: Map<string, number>): void {
  nodes.sort((a, b) => {
    const difference = orderOf(a, orders) - orderOf(b, orders)

    if (difference !== 0 && !Number.isNaN(difference)) {
      return difference
    }

    return a.label.localeCompare(b.label)
  })
}

function toNode(trie: TTrieNode, orders: Map<string, number>): TDocsNavigationNode {
  const { page } = trie
  const label = page?.frontmatter.title ?? sentenceCase(trie.segment)
  const base: TDocsNavigationNode = { id: trie.path, label }

  if (page?.frontmatter.symbol) {
    base.symbol = page.frontmatter.symbol
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
export function buildNavigationTree(pages: TDocsPage[]): TDocsNavigationNode[] {
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
    const rootNode: TDocsNavigationNode = {
      id: rootPage.path,
      label: rootPage.frontmatter.title,
      href: rootPage.path,
    }

    if (rootPage.frontmatter.symbol) {
      rootNode.symbol = rootPage.frontmatter.symbol
    }

    orders.set(rootNode.id, rootPage.frontmatter.order ?? 0)
    nodes.push(rootNode)
  }

  sortNodes(nodes, orders)

  return nodes
}

/** Lists the destinations of the tree in reading order. */
export function listNavigationLeaves(
  tree: TDocsNavigationNode[],
): (TDocsNavigationNode & { href: string })[] {
  const leaves: (TDocsNavigationNode & { href: string })[] = []

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
): { previous?: TDocsNeighbour; next?: TDocsNeighbour } {
  const index = leaves.findIndex((leaf) => leaf.href === path)

  if (index === -1) {
    return {}
  }

  const result: { previous?: TDocsNeighbour; next?: TDocsNeighbour } = {}
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
export function getBreadcrumbs(pages: TDocsPage[], path: string): TDocsBreadcrumb[] {
  const trail: TDocsBreadcrumb[] = [{ label: 'Docs', href: rootPath }]
  let current = rootPath

  for (const segment of segmentsOf(path)) {
    current = `${current}/${segment}`
    const match = pages.find((page) => page.path === current)

    trail.push({ label: match?.frontmatter.title ?? sentenceCase(segment), href: current })
  }

  return trail
}
