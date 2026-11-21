import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { symbolCatalog } from '#/docs/symbol-catalog.js'

import SymbolGallery from './symbol-gallery.js'

describe('symbol gallery', () => {
  it('links each symbol to its own page in the stacked layout', () => {
    render(<SymbolGallery />)

    expect(screen.getByRole('link', { name: 'activity' })).toHaveAttribute(
      'href',
      '/docs/symbols/activity',
    )
    expect(screen.queryByRole('button', { name: 'activity' })).not.toBeInTheDocument()
  })

  it('filters symbols by search text and reports how many match', async () => {
    const user = userEvent.setup()
    render(<SymbolGallery />)

    await user.type(screen.getByRole('searchbox', { name: 'Search symbols' }), 'pulse')

    expect(screen.getByRole('link', { name: 'activity' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(
      `of ${String(symbolCatalog.length)} symbols`,
    )
    expect(screen.queryByRole('link', { name: 'archive' })).not.toBeInTheDocument()
  })

  it('selects a symbol in place in the split layout', () => {
    render(<SymbolGallery layout="split" />)

    expect(screen.getByRole('button', { name: 'activity' })).toHaveAttribute('aria-pressed')
    expect(screen.queryByRole('link', { name: 'activity' })).not.toBeInTheDocument()
  })
})
