import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactElement } from 'react'
import { describe, expect, it, vi } from 'vitest'

import type { TDocsPage } from '#/docs/types.js'

import { DocsNav, DocsNavDrawer } from './docs-nav.js'
import { DocsProvider } from './docs-provider.js'

vi.mock('next/navigation', () => ({ usePathname: () => '/docs' }))

const pages: TDocsPage[] = [
  { path: '/docs', file: 'index.mdx', frontmatter: { title: 'Introduction', order: 1 } },
  {
    path: '/docs/installation',
    file: 'installation/index.mdx',
    frontmatter: { title: 'Installation', order: 2 },
  },
]

function renderWithDocs(children: ReactElement): void {
  render(<DocsProvider pages={pages}>{children}</DocsProvider>)
}

describe('DocsNav', () => {
  it('renders the documentation tree as a navigation landmark', () => {
    renderWithDocs(<DocsNav />)

    expect(screen.getByRole('navigation', { name: 'Documentation' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Installation' })).toHaveAttribute(
      'href',
      '/docs/installation',
    )
  })

  it('opens the tree in a drawer from the menu button', async () => {
    const user = userEvent.setup()

    renderWithDocs(<DocsNavDrawer />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Menu' }))

    expect(await screen.findByRole('dialog')).toBeInTheDocument()
  })
})
