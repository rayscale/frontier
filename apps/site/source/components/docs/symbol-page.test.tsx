import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SymbolPage } from './symbol-page.js'

describe('symbol page', () => {
  it('renders the symbol name, its description, and copy actions for its SVG, JSX, and import', () => {
    render(<SymbolPage name="activity" />)

    expect(screen.getByRole('heading', { level: 1, name: 'Activity' })).toBeInTheDocument()
    expect(screen.getByText('Represents activity or a pulse.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy SVG' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy JSX' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy import' })).toBeInTheDocument()
  })

  it('links related symbols to their own pages', () => {
    render(<SymbolPage name="arrow-right" />)

    expect(screen.getByRole('heading', { name: 'More like this' })).toBeInTheDocument()
    const related = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.startsWith('/docs/symbols/'))
    expect(related.length).toBeGreaterThan(0)
    expect(related.map((link) => link.getAttribute('href'))).not.toContain('/docs/symbols/activity')
  })

  it('renders nothing for a name the package does not export', () => {
    const { container } = render(<SymbolPage name="not-a-symbol" />)

    expect(container).toBeEmptyDOMElement()
  })
})
