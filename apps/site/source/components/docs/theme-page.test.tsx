import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { ThemeProvider } from '#/components/theme/index.js'

import { ThemePage } from './theme-page.js'

function renderPage(name: string): ReturnType<typeof render> {
  return render(
    <ThemeProvider>
      <ThemePage name={name} />
    </ThemeProvider>,
  )
}

describe('theme page', () => {
  beforeEach(() => {
    window.localStorage.clear()
    delete document.documentElement.dataset.theme
  })

  it('shows a preview of the theme in both modes', () => {
    renderPage('bisnes')

    expect(screen.getByRole('group', { name: 'Bisnes theme in light mode' })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Bisnes theme in dark mode' })).toBeInTheDocument()
  })

  it('names the guideline that an extended theme departs from, with its reason', () => {
    renderPage('bisnes')

    expect(screen.getByRole('heading', { name: /Departures/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Typeface' })).toHaveAttribute(
      'href',
      '/docs/guidelines/foundations/typeface',
    )
    expect(screen.getByText(/system typeface/)).toBeInTheDocument()
  })

  it('has no departures for a conformant theme, and lists the values it changes', () => {
    renderPage('frontier')

    expect(screen.queryByRole('heading', { name: /Departures/ })).not.toBeInTheDocument()
    expect(
      screen.getByText('This is the default theme. The other themes change its values.'),
    ).toBeInTheDocument()
  })

  it('lists the values a theme changes, and measures every contrast requirement', () => {
    renderPage('bisnes')

    expect(screen.getByText('--frontier-border-width')).toBeInTheDocument()
    expect(screen.getAllByText('text on background')).toHaveLength(2)
    expect(screen.queryByText('Fail')).not.toBeInTheDocument()
  })

  it('applies the theme from its page', async () => {
    renderPage('bisnes')

    screen.getByRole('button', { name: 'Use Bisnes' }).click()

    expect(await screen.findByText('In use')).toBeInTheDocument()
    expect(document.documentElement.dataset.theme).toBe('bisnes')
  })

  it('renders nothing for a theme the package does not have', () => {
    const { container } = renderPage('sepia')

    expect(container).toBeEmptyDOMElement()
  })
})
