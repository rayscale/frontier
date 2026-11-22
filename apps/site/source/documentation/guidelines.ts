import { posix } from 'node:path'

import { guidelineExamples } from './guideline-examples.js'

/** The URL path of the guidelines section of the documentation. */
export const guidelinesPath = '/documentation/guidelines'

/** The title of a guideline: its first heading. */
export function guidelineTitle(source: string): string | undefined {
  return /^#\s+(.+?)\s*$/m.exec(source)?.[1]
}

function toPlainText(text: string): string {
  return text.replaceAll(/\[([^\]]+)\]\([^)]*\)/g, '$1').replaceAll(/[`*]/g, '')
}

/** The first sentence of a guideline after its title, as plain text. */
export function guidelineDescription(source: string): string | undefined {
  const paragraph = source
    .replace(/^#\s+.*$/m, '')
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block !== '' && !/^[#\-*>|`]/.test(block))

  if (!paragraph) {
    return undefined
  }

  const text = toPlainText(paragraph.replaceAll(/\s*\n\s*/g, ' '))

  return /^.+?[.!?](?=\s|$)/.exec(text)?.[0] ?? text
}

/**
 * Where each link of an index comes, so the pages keep the order that the index gives them. The
 * keys are the link targets, such as `clarity.md` or `principles/README.md`.
 */
export function indexOrder(index: string): Map<string, number> {
  const order = new Map<string, number>()

  for (const match of index.matchAll(/^\s*[-*]\s+\[[^\]]+\]\((?:\.\/)?([^)#\s]+)\)/gm)) {
    const target = match[1]

    if (target !== undefined && !order.has(target)) {
      order.set(target, order.size)
    }
  }

  return order
}

/** The URL path of a guideline, from its file relative to the guidelines folder. */
export function guidelineRoute(file: string): string {
  const segments = file.replace(/\.md$/, '').split('/')

  if (segments.at(-1) === 'README') {
    segments.pop()
  }

  return [guidelinesPath, ...segments].join('/')
}

/**
 * Turns a link between guidelines, written as a path to a Markdown file, into the path of the
 * page. Any other link stays as it is.
 */
export function rewriteGuidelineLink(url: string, fromFile: string): string {
  if (/^([a-z][a-z\d+.-]*:|#|\/)/i.test(url)) {
    return url
  }

  const hashIndex = url.indexOf('#')
  const target = hashIndex === -1 ? url : url.slice(0, hashIndex)
  const hash = hashIndex === -1 ? '' : url.slice(hashIndex)

  if (!target.endsWith('.md')) {
    return url
  }

  const resolved = posix.normalize(posix.join(posix.dirname(fromFile), target))

  return resolved.startsWith('..') ? url : `${guidelineRoute(resolved)}${hash}`
}

/** The part of a Markdown syntax tree that the guideline plugin reads and changes. */
interface TNode {
  type: string
  depth?: number
  url?: string
  value?: string
  name?: string
  attributes?: { type: string; name: string; value: string }[]
  children?: TNode[]
}

function rewriteLinks(node: TNode, fromFile: string): void {
  if (node.type === 'link' && node.url !== undefined) {
    node.url = rewriteGuidelineLink(node.url, fromFile)
  }

  node.children?.forEach((child) => {
    rewriteLinks(child, fromFile)
  })
}

function isDoDontTable(node: TNode): boolean {
  const header = node.type === 'table' ? node.children?.[0] : undefined
  const heads = (header?.children ?? []).map((cell) => plainText(cell).trim())

  return heads.length === 2 && heads[0] === 'Do' && heads[1] === "Don't"
}

function plainText(node: TNode): string {
  if (node.value !== undefined) {
    return node.value
  }

  return (node.children ?? []).map(plainText).join('')
}

/**
 * Shows the Do and Don't tables of a guideline as live examples. The guideline keeps its table, so
 * it reads the same anywhere. The site decides which examples go with it: `guidelineExamples` names
 * them for each table of the file, in order, and for each row of the table. A table with no
 * examples stays a table.
 */
function replaceExamples(nodes: TNode[], file: string): TNode[] {
  const tables = guidelineExamples.get(file) ?? []
  let ordinal = 0

  return nodes.map((node) => {
    if (!isDoDontTable(node)) {
      return node
    }

    const ids = tables[ordinal]
    ordinal += 1
    if (!ids) {
      return node
    }

    const rows = (node.children ?? [])
      .slice(1)
      .map((row) => (row.children ?? []).map((cell) => plainText(cell).trim()))

    return {
      type: 'mdxJsxFlowElement',
      name: 'DoDont',
      attributes: [
        { type: 'mdxJsxAttribute', name: 'examples', value: ids.join(',') },
        { type: 'mdxJsxAttribute', name: 'captions', value: JSON.stringify(rows) },
      ],
      children: [],
    }
  })
}

/**
 * Prepares a guideline to be a page. The page header shows the title, so the first heading goes. A
 * later top-level heading becomes a section heading, and links between guidelines point to pages.
 */
export function remarkGuideline({ file }: { file: string }): (tree: TNode) => void {
  return (tree) => {
    let titleRemoved = false
    const children: TNode[] = []

    for (const node of tree.children ?? []) {
      if (node.type === 'heading' && node.depth === 1) {
        if (titleRemoved) {
          children.push({ ...node, depth: 2 })
        }

        titleRemoved = true
      } else {
        children.push(node)
      }
    }

    tree.children = replaceExamples(children, file)
    rewriteLinks(tree, file)
  }
}
