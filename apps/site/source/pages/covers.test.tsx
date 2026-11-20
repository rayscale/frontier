import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ComponentsCover } from './components-cover/index.js'
import { SymbolsCover } from './symbols-cover/index.js'
import { TypefaceCover } from './typeface-cover/index.js'

describe('cover pages', () => {
  it.each([
    [ComponentsCover, 'Components built on native HTML.', '/docs/components'],
    [SymbolsCover, 'One grid, one stroke, every symbol.', '/docs/symbols'],
    [TypefaceCover, 'Set in Geist.', '/docs/typeface'],
  ])('renders %o with its title and a link to the documentation', (Cover, title, docs) => {
    render(<Cover />)

    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Read the docs' })).toHaveAttribute('href', docs)
  })
})
