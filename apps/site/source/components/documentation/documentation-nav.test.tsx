import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactElement } from 'react'
import { describe, expect, it, vi } from 'vitest'

import type { TDocumentationPage } from '#/documentation/types.js'

import { DocumentationNav, DocumentationNavDrawer } from './documentation-nav.js'
import { DocumentationProvider } from './documentation-provider.js'

vi.mock('next/navigation', () => ({ usePathname: () => '/documentation' }))

const pages: TDocumentationPage[] = [
  { path: '/documentation', file: 'index.mdx', frontmatter: { title: 'Introduction', order: 1 } },
  {
    path: '/documentation/installation',
    file: 'installation/index.mdx',
    frontmatter: { title: 'Installation', order: 2 },
  },
]

function renderWithDocumentation(children: ReactElement): void {
  render(<DocumentationProvider pages={pages}>{children}</DocumentationProvider>)
}

describe('DocumentationNav', () => {
  it('renders the documentation tree as a navigation landmark', () => {
    renderWithDocumentation(<DocumentationNav />)

    expect(screen.getByRole('navigation', { name: 'Documentation' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Installation' })).toHaveAttribute(
      'href',
      '/documentation/installation',
    )
  })

  it('opens the tree in a drawer from the menu button', async () => {
    const user = userEvent.setup()

    renderWithDocumentation(<DocumentationNavDrawer />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Menu' }))

    expect(await screen.findByRole('dialog')).toBeInTheDocument()
  })
})
