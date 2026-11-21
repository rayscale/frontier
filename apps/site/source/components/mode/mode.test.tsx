import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ModeProvider, ModeToggle, useMode } from './index.js'

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
  const { preference, resolved } = useMode()

  return (
    <p>
      {preference}:{resolved}
    </p>
  )
}

describe('mode', () => {
  beforeEach(() => {
    window.localStorage.clear()
    delete document.documentElement.dataset.mode
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('follows the system by default and applies it to the document', () => {
    stubSystem(true)

    render(
      <ModeProvider>
        <Probe />
      </ModeProvider>,
    )

    expect(screen.getByText('system:dark')).toBeInTheDocument()
    expect(document.documentElement.dataset.mode).toBe('dark')
  })

  it('restores a stored preference', () => {
    stubSystem(true)
    window.localStorage.setItem('frontier-mode', 'light')

    render(
      <ModeProvider>
        <Probe />
      </ModeProvider>,
    )

    expect(screen.getByText('light:light')).toBeInTheDocument()
    expect(document.documentElement.dataset.mode).toBe('light')
  })

  it('ignores a stored value it does not know', () => {
    stubSystem(false)
    window.localStorage.setItem('frontier-mode', 'sepia')

    render(
      <ModeProvider>
        <Probe />
      </ModeProvider>,
    )

    expect(screen.getByText('system:light')).toBeInTheDocument()
  })

  it('tracks a change of the system while following it', () => {
    const system = stubSystem(false)

    render(
      <ModeProvider>
        <Probe />
      </ModeProvider>,
    )
    act(() => {
      system.change(true)
    })

    expect(document.documentElement.dataset.mode).toBe('dark')
  })

  it('cycles light, dark, and system from the toggle and remembers the choice', async () => {
    const user = userEvent.setup()
    stubSystem(false)
    window.localStorage.setItem('frontier-mode', 'light')

    render(
      <ModeProvider>
        <ModeToggle />
        <Probe />
      </ModeProvider>,
    )

    await user.click(screen.getByRole('button', { name: /mode/i }))
    expect(screen.getByText('dark:dark')).toBeInTheDocument()
    expect(window.localStorage.getItem('frontier-mode')).toBe('dark')

    await user.click(screen.getByRole('button', { name: /mode/i }))
    expect(screen.getByText('system:light')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /mode/i }))
    expect(screen.getByText('light:light')).toBeInTheDocument()
  })

  it('names the current mode and the next one on the toggle', () => {
    stubSystem(false)
    window.localStorage.setItem('frontier-mode', 'light')

    render(
      <ModeProvider>
        <ModeToggle />
      </ModeProvider>,
    )

    expect(screen.getByRole('button', { name: 'Mode: light. Switch to dark.' })).toBeInTheDocument()
  })
})
