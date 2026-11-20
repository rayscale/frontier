import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { describe, expect, it } from 'vitest'

import { routes } from './routes.js'

function renderAt(path: string): void {
  render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [path] })} />)
}

describe('routes', () => {
  it('renders the landing page with its header and footer at the root', async () => {
    renderAt('/')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'A design language for the web.' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders a not found page for an unknown path', async () => {
    renderAt('/missing')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument()
  })

  it('renders the introduction at the documentation root with the navigation tree', async () => {
    renderAt('/docs')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Introduction' }),
    ).toBeInTheDocument()

    const tree = screen.getByRole('navigation', { name: 'Documentation' })

    expect(within(tree).getByRole('link', { name: 'Installation' })).toHaveAttribute(
      'href',
      '/docs/installation',
    )
  })

  it('renders a component page with its examples and the breadcrumb trail', async () => {
    renderAt('/docs/components/button')

    expect(await screen.findByRole('heading', { level: 1, name: 'Button' })).toBeInTheDocument()
    expect(
      await screen.findByRole('heading', { level: 2, name: /API reference/ }),
    ).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
  })

  it('loads the live example of a component page', async () => {
    renderAt('/docs/components/button')

    expect((await screen.findAllByRole('button', { name: 'Primary' })).length).toBeGreaterThan(0)
  })

  it('shows the pages before and after the current one', async () => {
    renderAt('/docs/installation')

    await screen.findByRole('heading', { level: 1, name: 'Installation' })
    const pager = screen.getByRole('navigation', { name: 'Page navigation' })

    expect(within(pager).getByRole('link', { name: /Introduction/ })).toHaveAttribute(
      'href',
      '/docs',
    )
    expect(within(pager).getByRole('link', { name: /Overview/ })).toHaveAttribute(
      'href',
      '/docs/components',
    )
  })

  it('renders a not found page inside the documentation for an unknown page', async () => {
    renderAt('/docs/nothing-here')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Documentation' })).toBeInTheDocument()
  })

  it('navigates between pages without leaving the app', async () => {
    const user = userEvent.setup()
    renderAt('/docs')

    await screen.findByRole('heading', { level: 1, name: 'Introduction' })
    const tree = screen.getByRole('navigation', { name: 'Documentation' })

    await user.click(within(tree).getByRole('link', { name: 'Installation' }))

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Installation' }),
    ).toBeInTheDocument()
  })
})
