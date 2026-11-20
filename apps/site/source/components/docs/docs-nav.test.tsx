import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import { DocsNav, DocsNavDrawer } from './docs-nav.js'

describe('DocsNav', () => {
  it('renders the documentation tree as a navigation landmark', () => {
    render(
      <MemoryRouter initialEntries={['/docs']}>
        <DocsNav />
      </MemoryRouter>,
    )

    expect(screen.getByRole('navigation', { name: 'Documentation' })).toBeInTheDocument()
  })

  it('opens the tree in a drawer from the menu button', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/docs']}>
        <DocsNavDrawer />
      </MemoryRouter>,
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Menu' }))

    expect(await screen.findByRole('dialog')).toBeInTheDocument()
  })
})
