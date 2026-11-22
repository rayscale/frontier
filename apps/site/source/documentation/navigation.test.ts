import { describe, expect, it } from 'vitest'

import {
  buildNavigationTree,
  getBreadcrumbs,
  getNeighbours,
  listNavigationLeaves,
} from './navigation.js'
import type { TDocumentationPage } from './types.js'

function page(path: string, title: string, order?: number, extra: object = {}): TDocumentationPage {
  const file =
    path === '/documentation' ? 'index.mdx' : `${path.replace('/documentation/', '')}/index.mdx`

  return { path, file, frontmatter: { title, order, ...extra } }
}

const pages: TDocumentationPage[] = [
  page('/documentation', 'Introduction', 0),
  page('/documentation/installation', 'Installation', 10),
  page('/documentation/components', 'Components', 20),
  page('/documentation/components/button', 'Button', 2),
  page('/documentation/components/badge', 'Badge', 1),
  page('/documentation/icons', 'Icons', 30),
  page('/documentation/icons/usage', 'Usage', 1),
  page('/documentation/hidden', 'Hidden', 99, { sidebar: false }),
]

describe('buildNavigationTree', () => {
  it('lists the root page first, then the sections by order', () => {
    const tree = buildNavigationTree(pages)

    expect(tree.map((node) => node.label)).toEqual([
      'Introduction',
      'Installation',
      'Components',
      'Icons',
    ])
  })

  it('sorts siblings by order, then by title', () => {
    const tree = buildNavigationTree([
      page('/documentation/components/zeta', 'Zeta'),
      page('/documentation/components/alpha', 'Alpha'),
      page('/documentation/components/late', 'Late', 5),
      page('/documentation/components/early', 'Early', 1),
    ])

    expect(tree[0]?.children?.map((node) => node.label)).toEqual(['Early', 'Late', 'Alpha', 'Zeta'])
  })

  it('gives a section that has its own page an overview leaf as its first child', () => {
    const components = buildNavigationTree(pages).find((node) => node.label === 'Components')

    expect(components?.href).toBeUndefined()
    expect(components?.children?.map((node) => node.label)).toEqual(['Overview', 'Badge', 'Button'])
    expect(components?.children?.[0]).toMatchObject({
      id: '/documentation/components#overview',
      href: '/documentation/components',
    })
  })

  it('keeps a page without children as a plain leaf', () => {
    const installation = buildNavigationTree(pages).find((node) => node.label === 'Installation')

    expect(installation).toMatchObject({
      id: '/documentation/installation',
      href: '/documentation/installation',
    })
    expect(installation?.children).toBeUndefined()
  })

  it('leaves pages that opt out of the sidebar out of the tree', () => {
    const labels = JSON.stringify(buildNavigationTree(pages))

    expect(labels).not.toContain('Hidden')
  })

  it('creates a label-only section for a folder with children but no page', () => {
    const tree = buildNavigationTree([page('/documentation/guides/start', 'Start')])

    expect(tree[0]).toMatchObject({ id: '/documentation/guides', label: 'Guides' })
    expect(tree[0]?.href).toBeUndefined()
    expect(tree[0]?.children?.[0]?.label).toBe('Start')
  })

  it('carries the icon and the status of a page', () => {
    const tree = buildNavigationTree([
      page('/documentation/button', 'Button', 1, { icon: 'plus', status: 'beta' }),
    ])

    expect(tree[0]).toMatchObject({ icon: 'plus', status: 'beta' })
  })
})

describe('listNavigationLeaves', () => {
  it('walks the tree in reading order and keeps only destinations', () => {
    const leaves = listNavigationLeaves(buildNavigationTree(pages))

    expect(leaves.map((leaf) => leaf.href)).toEqual([
      '/documentation',
      '/documentation/installation',
      '/documentation/components',
      '/documentation/components/badge',
      '/documentation/components/button',
      '/documentation/icons',
      '/documentation/icons/usage',
    ])
  })
})

describe('getNeighbours', () => {
  const leaves = listNavigationLeaves(buildNavigationTree(pages))

  it('returns the previous and next destinations', () => {
    expect(getNeighbours(leaves, '/documentation/components/badge')).toEqual({
      previous: { label: 'Overview', href: '/documentation/components' },
      next: { label: 'Button', href: '/documentation/components/button' },
    })
  })

  it('has no previous destination on the first page and no next on the last', () => {
    expect(getNeighbours(leaves, '/documentation').previous).toBeUndefined()
    expect(getNeighbours(leaves, '/documentation/icons/usage').next).toBeUndefined()
  })

  it('returns nothing for a path outside the tree', () => {
    expect(getNeighbours(leaves, '/documentation/missing')).toEqual({})
  })
})

describe('getBreadcrumbs', () => {
  it('lists the ancestors that have a page, then the current page', () => {
    expect(getBreadcrumbs(pages, '/documentation/components/button')).toEqual([
      { label: 'Documentation', href: '/documentation' },
      { label: 'Components', href: '/documentation/components' },
      { label: 'Button', href: '/documentation/components/button' },
    ])
  })

  it('titles a folder without a page from its segment', () => {
    expect(
      getBreadcrumbs([page('/documentation/guides/start', 'Start')], '/documentation/guides/start'),
    ).toEqual([
      { label: 'Documentation', href: '/documentation' },
      { label: 'Guides', href: '/documentation/guides' },
      { label: 'Start', href: '/documentation/guides/start' },
    ])
  })

  it('is just the root for the root page', () => {
    expect(getBreadcrumbs(pages, '/documentation')).toEqual([
      { label: 'Documentation', href: '/documentation' },
    ])
  })
})
