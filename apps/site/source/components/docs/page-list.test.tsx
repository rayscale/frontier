import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { TDocsFrontmatter, TDocsPage } from '#/docs/types.js'

import { PageList } from './page-list.js'

function page(path: string, frontmatter: TDocsFrontmatter): TDocsPage {
  return { path, file: `${path.replace('/docs/', '')}/index.mdx`, frontmatter }
}

const components = page('/docs/components', { title: 'Components' })
const actions = page('/docs/components/actions', {
  title: 'Actions',
  description: 'Controls that trigger one operation.',
  order: 1,
  symbol: 'pointer',
})
const button = page('/docs/components/actions/button', { title: 'Button', order: 1 })
const selection = page('/docs/components/selection', { title: 'Selection', order: 2 })
const switchPage = page('/docs/components/selection/switch', { title: 'Switch', order: 1 })

describe('page list', () => {
  it('groups the pages under each category that has pages of its own', () => {
    render(
      <PageList
        current={components}
        pages={[components, actions, button, selection, switchPage]}
      />,
    )

    const headings = screen.getAllByRole('heading', { level: 2 })

    expect(headings).toHaveLength(2)
    expect(headings[0]).toHaveTextContent('Actions')
    expect(headings[1]).toHaveTextContent('Selection')

    const group = screen.getByRole('region', { name: /Actions/ })

    expect(within(group).getByText('Controls that trigger one operation.')).toBeInTheDocument()
    expect(within(group).getByRole('link', { name: 'Button' })).toHaveAttribute(
      'href',
      '/docs/components/actions/button',
    )
    expect(within(group).queryByRole('link', { name: 'Switch' })).not.toBeInTheDocument()
  })

  it('lists the pages directly as cards when none of them has pages of its own', () => {
    render(<PageList current={actions} pages={[components, actions, button]} />)

    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Button' })).toHaveAttribute(
      'href',
      '/docs/components/actions/button',
    )
  })

  it('leaves out the pages that are hidden from the sidebar', () => {
    const hidden = page('/docs/components/actions/hidden', { title: 'Hidden', sidebar: false })

    render(<PageList current={actions} pages={[actions, button, hidden]} />)

    expect(screen.queryByRole('link', { name: 'Hidden' })).not.toBeInTheDocument()
  })
})
