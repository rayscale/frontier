import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'

import { ThemeProvider } from '#/components/theme/index.js'

import ThemeGallery from './theme-gallery.js'

function renderGallery(): void {
  render(
    <ThemeProvider>
      <ThemeGallery />
    </ThemeProvider>,
  )
}

describe('theme gallery', () => {
  beforeEach(() => {
    window.localStorage.clear()
    delete document.documentElement.dataset.theme
  })

  it('lists every theme with its kind and a link to its page', () => {
    renderGallery()

    expect(screen.getByRole('link', { name: 'Frontier' })).toHaveAttribute(
      'href',
      '/docs/themes/frontier',
    )
    expect(screen.getByRole('link', { name: 'Bisnes' })).toHaveAttribute(
      'href',
      '/docs/themes/bisnes',
    )
    expect(screen.getByText('Conformant')).toBeInTheDocument()
    expect(screen.getByText('Extended')).toBeInTheDocument()
  })

  it('marks the theme in use and offers the others', () => {
    renderGallery()

    expect(screen.getAllByText('In use')).toHaveLength(1)
    expect(screen.queryByRole('button', { name: 'Use Frontier' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Use Bisnes' })).toBeInTheDocument()
  })

  it('applies a theme when it is chosen', async () => {
    const user = userEvent.setup()

    renderGallery()
    await user.click(screen.getByRole('button', { name: 'Use Bisnes' }))

    expect(document.documentElement.dataset.theme).toBe('bisnes')
    expect(screen.getByRole('button', { name: 'Use Frontier' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Use Bisnes' })).not.toBeInTheDocument()
  })
})
