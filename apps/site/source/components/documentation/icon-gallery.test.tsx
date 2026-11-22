import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { iconCatalog } from '#/documentation/icon-catalog.js'

import IconGallery from './icon-gallery.js'

describe('icon gallery', () => {
  it('links each icon to its own page in the stacked layout', () => {
    render(<IconGallery />)

    expect(screen.getByRole('link', { name: 'activity' })).toHaveAttribute(
      'href',
      '/documentation/icons/activity',
    )
    expect(screen.queryByRole('button', { name: 'activity' })).not.toBeInTheDocument()
  })

  it('filters icons by search text and reports how many match', async () => {
    const user = userEvent.setup()
    render(<IconGallery />)

    await user.type(screen.getByRole('searchbox', { name: 'Search icons' }), 'pulse')

    expect(screen.getByRole('link', { name: 'activity' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(`of ${String(iconCatalog.length)} icons`)
    expect(screen.queryByRole('link', { name: 'archive' })).not.toBeInTheDocument()
  })

  it('selects an icon in place in the split layout', () => {
    render(<IconGallery layout="split" />)

    expect(screen.getByRole('button', { name: 'activity' })).toHaveAttribute('aria-pressed')
    expect(screen.queryByRole('link', { name: 'activity' })).not.toBeInTheDocument()
  })
})
