import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { IconPage } from './icon-page.js'

describe('icon page', () => {
  it('renders the icon name, its description, and copy actions for its SVG, JSX, and import', () => {
    render(<IconPage name="activity" />)

    expect(screen.getByRole('heading', { level: 1, name: 'Activity' })).toBeInTheDocument()
    expect(screen.getByText('Represents activity or a pulse.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy SVG' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy JSX' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy import' })).toBeInTheDocument()
  })

  it('links related icons to their own pages', () => {
    render(<IconPage name="arrow-right" />)

    expect(screen.getByRole('heading', { name: 'More like this' })).toBeInTheDocument()
    const related = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.startsWith('/documentation/icons/'))
    expect(related.length).toBeGreaterThan(0)
    expect(related.map((link) => link.getAttribute('href'))).not.toContain(
      '/documentation/icons/activity',
    )
  })

  it('renders nothing for a name the package does not export', () => {
    const { container } = render(<IconPage name="not-a-icon" />)

    expect(container).toBeEmptyDOMElement()
  })
})
