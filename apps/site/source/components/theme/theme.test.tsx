import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ThemeProvider, ThemeToggle, useTheme } from './index.js'

function stubSystem(dark: boolean): { change: (next: boolean) => void } {
  let matches = dark
  const listeners = new Set<() => void>()

  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      get matches() {
        return matches
      },
      media: query,
      addEventListener: (_event: string, listener: () => void) => listeners.add(listener),
      removeEventListener: (_event: string, listener: () => void) => listeners.delete(listener),
    })),
  )

  return {
    change: (next) => {
      matches = next
      listeners.forEach((listener) => {
        listener()
      })
    },
  }
}

function Probe() {
  const { preference, resolved } = useTheme()

  return (
    <p>
      {preference}:{resolved}
    </p>
  )
}

describe('theme', () => {
  beforeEach(() => {
    window.localStorage.clear()
    delete document.documentElement.dataset.theme
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('follows the system by default and applies it to the document', () => {
    stubSystem(true)

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )

    expect(screen.getByText('system:dark')).toBeInTheDocument()
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('restores a stored preference', () => {
    stubSystem(true)
    window.localStorage.setItem('frontier-theme', 'light')

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )

    expect(screen.getByText('light:light')).toBeInTheDocument()
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('ignores a stored value it does not know', () => {
    stubSystem(false)
    window.localStorage.setItem('frontier-theme', 'sepia')

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )

    expect(screen.getByText('system:light')).toBeInTheDocument()
  })

  it('tracks a change of the system while following it', () => {
    const system = stubSystem(false)

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    act(() => {
      system.change(true)
    })

    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('cycles light, dark, and system from the toggle and remembers the choice', async () => {
    const user = userEvent.setup()
    stubSystem(false)
    window.localStorage.setItem('frontier-theme', 'light')

    render(
      <ThemeProvider>
        <ThemeToggle />
        <Probe />
      </ThemeProvider>,
    )

    await user.click(screen.getByRole('button', { name: /theme/i }))
    expect(screen.getByText('dark:dark')).toBeInTheDocument()
    expect(window.localStorage.getItem('frontier-theme')).toBe('dark')

    await user.click(screen.getByRole('button', { name: /theme/i }))
    expect(screen.getByText('system:light')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /theme/i }))
    expect(screen.getByText('light:light')).toBeInTheDocument()
  })

  it('names the current theme and the next one on the toggle', () => {
    stubSystem(false)
    window.localStorage.setItem('frontier-theme', 'light')

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    )

    expect(
      screen.getByRole('button', { name: 'Theme: light. Switch to dark.' }),
    ).toBeInTheDocument()
  })
})
