import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ThemeProvider } from '#/components/theme/index.js'

import { ComponentsCover } from './components-cover/index.js'
import { SymbolsCover } from './symbols-cover/index.js'
import { ThemesCover } from './themes-cover/index.js'
import { TypefaceCover } from './typeface-cover/index.js'

describe('cover pages', () => {
  it.each([
    [ComponentsCover, 'Pieces that fit together.', '/docs/components'],
    [SymbolsCover, 'One grid, one stroke, every symbol.', '/docs/symbols'],
    [TypefaceCover, 'Set in Geist.', '/docs/typeface'],
    [ThemesCover, 'One system, in your voice.', '/docs/themes'],
  ])('renders %o with its title and a link to the documentation', (Cover, title, docs) => {
    render(
      <ThemeProvider>
        <Cover />
      </ThemeProvider>,
    )

    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Read the docs' })).toHaveAttribute('href', docs)
  })
})
