import { render, screen } from '@testing-library/react'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { describe, expect, it } from 'vitest'

import { routes } from './routes.js'

function renderAt(path: string): void {
  render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [path] })} />)
}

describe('routes', () => {
  it('renders the home page at the root path', () => {
    renderAt('/')

    expect(screen.getByRole('heading', { level: 1, name: 'Frontier' })).toBeInTheDocument()
  })

  it('shares one layout with a link back to the home page', () => {
    renderAt('/')

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Frontier' })).toHaveAttribute('href', '/')
  })

  it('renders a not found page for an unknown path', () => {
    renderAt('/missing')

    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Go to the home page' })).toHaveAttribute('href', '/')
  })
})
