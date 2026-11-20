import { describe, expect, it } from 'vitest'

import {
  buildNavigationTree,
  getBreadcrumbs,
  getNeighbours,
  listNavigationLeaves,
} from './navigation.js'
import type { TDocsPage } from './types.js'

function page(path: string, title: string, order?: number, extra: object = {}): TDocsPage {
  const file = path === '/docs' ? 'index.mdx' : `${path.replace('/docs/', '')}/index.mdx`

  return { path, file, frontmatter: { title, order, ...extra } }
}

const pages: TDocsPage[] = [
  page('/docs', 'Introduction', 0),
  page('/docs/installation', 'Installation', 10),
  page('/docs/components', 'Components', 20),
  page('/docs/components/button', 'Button', 2),
  page('/docs/components/badge', 'Badge', 1),
  page('/docs/typeface', 'Typeface', 30),
  page('/docs/typeface/usage', 'Usage', 1),
  page('/docs/hidden', 'Hidden', 99, { sidebar: false }),
]

describe('buildNavigationTree', () => {
  it('lists the root page first, then the sections by order', () => {
    const tree = buildNavigationTree(pages)

    expect(tree.map((node) => node.label)).toEqual([
      'Introduction',
      'Installation',
      'Components',
      'Typeface',
    ])
  })

  it('sorts siblings by order, then by title', () => {
    const tree = buildNavigationTree([
      page('/docs/components/zeta', 'Zeta'),
      page('/docs/components/alpha', 'Alpha'),
      page('/docs/components/late', 'Late', 5),
      page('/docs/components/early', 'Early', 1),
    ])

    expect(tree[0]?.children?.map((node) => node.label)).toEqual(['Early', 'Late', 'Alpha', 'Zeta'])
  })

  it('gives a section that has its own page an overview leaf as its first child', () => {
    const components = buildNavigationTree(pages).find((node) => node.label === 'Components')

    expect(components?.href).toBeUndefined()
    expect(components?.children?.map((node) => node.label)).toEqual(['Overview', 'Badge', 'Button'])
    expect(components?.children?.[0]).toMatchObject({
      id: '/docs/components#overview',
      href: '/docs/components',
    })
  })

  it('keeps a page without children as a plain leaf', () => {
    const installation = buildNavigationTree(pages).find((node) => node.label === 'Installation')

    expect(installation).toMatchObject({ id: '/docs/installation', href: '/docs/installation' })
    expect(installation?.children).toBeUndefined()
  })

  it('leaves pages that opt out of the sidebar out of the tree', () => {
    const labels = JSON.stringify(buildNavigationTree(pages))

    expect(labels).not.toContain('Hidden')
  })

  it('creates a label-only section for a folder with children but no page', () => {
    const tree = buildNavigationTree([page('/docs/guides/start', 'Start')])

    expect(tree[0]).toMatchObject({ id: '/docs/guides', label: 'Guides' })
    expect(tree[0]?.href).toBeUndefined()
    expect(tree[0]?.children?.[0]?.label).toBe('Start')
  })

  it('carries the symbol and the status of a page', () => {
    const tree = buildNavigationTree([
      page('/docs/button', 'Button', 1, { symbol: 'plus', status: 'beta' }),
    ])

    expect(tree[0]).toMatchObject({ symbol: 'plus', status: 'beta' })
  })
})

describe('listNavigationLeaves', () => {
  it('walks the tree in reading order and keeps only destinations', () => {
    const leaves = listNavigationLeaves(buildNavigationTree(pages))

    expect(leaves.map((leaf) => leaf.href)).toEqual([
      '/docs',
      '/docs/installation',
      '/docs/components',
      '/docs/components/badge',
      '/docs/components/button',
      '/docs/typeface',
      '/docs/typeface/usage',
    ])
  })
})

describe('getNeighbours', () => {
  const leaves = listNavigationLeaves(buildNavigationTree(pages))

  it('returns the previous and next destinations', () => {
    expect(getNeighbours(leaves, '/docs/components/badge')).toEqual({
      previous: { label: 'Overview', href: '/docs/components' },
      next: { label: 'Button', href: '/docs/components/button' },
    })
  })

  it('has no previous destination on the first page and no next on the last', () => {
    expect(getNeighbours(leaves, '/docs').previous).toBeUndefined()
    expect(getNeighbours(leaves, '/docs/typeface/usage').next).toBeUndefined()
  })

  it('returns nothing for a path outside the tree', () => {
    expect(getNeighbours(leaves, '/docs/missing')).toEqual({})
  })
})

describe('getBreadcrumbs', () => {
  it('lists the ancestors that have a page, then the current page', () => {
    expect(getBreadcrumbs(pages, '/docs/components/button')).toEqual([
      { label: 'Docs', href: '/docs' },
      { label: 'Components', href: '/docs/components' },
      { label: 'Button', href: '/docs/components/button' },
    ])
  })

  it('titles a folder without a page from its segment', () => {
    expect(getBreadcrumbs([page('/docs/guides/start', 'Start')], '/docs/guides/start')).toEqual([
      { label: 'Docs', href: '/docs' },
      { label: 'Guides', href: '/docs/guides' },
      { label: 'Start', href: '/docs/guides/start' },
    ])
  })

  it('is just the root for the root page', () => {
    expect(getBreadcrumbs(pages, '/docs')).toEqual([{ label: 'Docs', href: '/docs' }])
  })
})
