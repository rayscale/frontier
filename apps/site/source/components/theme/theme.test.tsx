import { runInNewContext } from 'node:vm'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'

import { ThemePicker, ThemeProvider, themeScript, useTheme } from './index.js'

function Probe() {
  const { theme } = useTheme()

  return <p>{theme}</p>
}

describe('theme', () => {
  beforeEach(() => {
    window.localStorage.clear()
    delete document.documentElement.dataset.theme
  })

  it('starts with the default theme and leaves the document without a theme', () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )

    expect(screen.getByText('frontier')).toBeInTheDocument()
    expect(document.documentElement.dataset.theme).toBeUndefined()
  })

  it('restores a stored theme and applies it to the document', () => {
    window.localStorage.setItem('frontier-theme', 'bisnes')

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )

    expect(screen.getByText('bisnes')).toBeInTheDocument()
    expect(document.documentElement.dataset.theme).toBe('bisnes')
  })

  it('ignores a stored theme that the package does not have', () => {
    window.localStorage.setItem('frontier-theme', 'sepia')

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )

    expect(screen.getByText('frontier')).toBeInTheDocument()
    expect(document.documentElement.dataset.theme).toBeUndefined()
  })

  it('chooses a theme with the picker and remembers the choice', async () => {
    const user = userEvent.setup()

    render(
      <ThemeProvider>
        <ThemePicker />
        <Probe />
      </ThemeProvider>,
    )

    await user.click(screen.getByRole('radio', { name: 'Bisnes' }))

    expect(document.documentElement.dataset.theme).toBe('bisnes')
    expect(window.localStorage.getItem('frontier-theme')).toBe('bisnes')

    await user.click(screen.getByRole('radio', { name: 'Frontier' }))

    expect(document.documentElement.dataset.theme).toBeUndefined()
    expect(window.localStorage.getItem('frontier-theme')).toBe('frontier')
  })

  it('marks the theme in use in the picker', () => {
    window.localStorage.setItem('frontier-theme', 'bisnes')

    render(
      <ThemeProvider>
        <ThemePicker />
      </ThemeProvider>,
    )

    expect(screen.getByRole('radio', { name: 'Bisnes' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Frontier' })).not.toBeChecked()
  })

  describe('script', () => {
    it('applies a remembered theme before the page paints', () => {
      window.localStorage.setItem('frontier-theme', 'bisnes')

      runInNewContext(themeScript, { window, document })

      expect(document.documentElement.dataset.theme).toBe('bisnes')
    })

    it('does not apply a theme the package does not have', () => {
      window.localStorage.setItem('frontier-theme', 'sepia')

      runInNewContext(themeScript, { window, document })

      expect(document.documentElement.dataset.theme).toBeUndefined()
    })
  })
})
