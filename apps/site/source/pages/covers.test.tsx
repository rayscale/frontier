import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ComponentsCover } from './components-cover/index.js'
import { IconsCover } from './icons-cover/index.js'

describe('cover pages', () => {
  it.each([
    [ComponentsCover, 'Pieces that fit together.', '/documentation/components'],
    [IconsCover, 'One grid, one stroke, every icon.', '/documentation/icons'],
  ])('renders %o with its title and a link to the documentation', (Cover, title, documentation) => {
    render(<Cover />)

    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Read the documentation' })).toHaveAttribute(
      'href',
      documentation,
    )
  })
})
