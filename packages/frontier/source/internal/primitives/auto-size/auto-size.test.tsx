import { act, render, screen, waitFor } from '@testing-library/react'
import type * as Motion from 'motion/react'
import { createRef } from 'react'
import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { AutoSize, type TAutoSizeProps } from './auto-size.js'

const motionState = vi.hoisted(() => ({ prefersReducedMotion: false }))

vi.mock('motion/react', async (importOriginal) => {
  const actual = await importOriginal<typeof Motion>()

  return {
    ...actual,
    useReducedMotion: () => motionState.prefersReducedMotion,
  }
})

type TResizeCallback = (entries: { contentRect: DOMRectReadOnly }[]) => void

const observers: {
  callback: TResizeCallback
  disconnect: ReturnType<typeof vi.fn>
}[] = []

function reportContentSize(width: number, height: number, index = observers.length - 1) {
  const observer = observers[index]

  if (!observer) {
    throw new Error('No ResizeObserver is registered.')
  }

  act(() => {
    observer.callback([{ contentRect: { width, height } as DOMRectReadOnly }])
  })
}

const fastTransition = { type: 'tween', duration: 0.01 } as const

describe('AutoSize', () => {
  const originalResizeObserver = globalThis.ResizeObserver
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight',
  )

  beforeEach(() => {
    observers.length = 0
    motionState.prefersReducedMotion = false

    globalThis.ResizeObserver = class MockResizeObserver {
      public readonly callback: TResizeCallback
      public readonly disconnect: Mock = vi.fn()
      public readonly unobserve: Mock = vi.fn()
      public readonly observe: Mock = vi.fn()

      public constructor(callback: TResizeCallback) {
        this.callback = callback
        observers.push(this)
      }
    } as unknown as typeof ResizeObserver

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get(this: HTMLElement) {
        return parseFloat(this.style.width) || 0
      },
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get(this: HTMLElement) {
        return parseFloat(this.style.height) || 0
      },
    })
  })

  afterEach(() => {
    globalThis.ResizeObserver = originalResizeObserver

    if (originalOffsetWidth) {
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth)
    }

    if (originalOffsetHeight) {
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight)
    }
  })

  function renderAutoSize(props: Partial<TAutoSizeProps> = {}) {
    return render(
      <AutoSize {...props}>
        <p>Content</p>
      </AutoSize>,
    )
  }

  function getContainer(): HTMLElement {
    const container = screen.getByText('Content').closest<HTMLElement>('.frontier-auto-size')

    if (!container) {
      throw new Error('Expected an auto size container.')
    }

    return container
  }

  it('renders its children inside a content wrapper with a vertical axis by default', () => {
    renderAutoSize()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(getContainer()).toHaveAttribute('data-axis', 'vertical')
  })

  it('forwards the ref to the animated container', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <AutoSize ref={ref}>
        <p>Content</p>
      </AutoSize>,
    )
    expect(ref.current).toBe(getContainer())
  })

  it('sets the first measured size without animating', () => {
    renderAutoSize()
    reportContentSize(320, 96)
    expect(getContainer().style.height).toBe('96px')
    expect(getContainer()).not.toHaveAttribute('data-animating')
  })

  it('animates the height to the new content height when the vertical axis grows', async () => {
    renderAutoSize({ transition: fastTransition })
    reportContentSize(320, 96)
    reportContentSize(320, 240)
    await waitFor(() => {
      expect(getContainer().style.height).toBe('240px')
    })
    await waitFor(() => {
      expect(getContainer()).not.toHaveAttribute('data-animating')
    })
  })

  it('animates the height down when the vertical axis shrinks', async () => {
    renderAutoSize({ transition: fastTransition })
    reportContentSize(320, 240)
    reportContentSize(320, 64)
    await waitFor(() => {
      expect(getContainer().style.height).toBe('64px')
    })
  })

  it('marks the container as animating while the size changes', () => {
    renderAutoSize({ transition: { type: 'tween', duration: 1 } })
    reportContentSize(320, 96)
    reportContentSize(320, 240)
    expect(getContainer()).toHaveAttribute('data-animating')
  })

  it('animates only the width on the horizontal axis', async () => {
    renderAutoSize({ axis: 'horizontal', transition: fastTransition })
    reportContentSize(120, 40)
    reportContentSize(260, 40)
    await waitFor(() => {
      expect(getContainer().style.width).toBe('260px')
    })
    expect(getContainer().style.height).toBe('')
  })

  it('animates both dimensions on the both axis', async () => {
    renderAutoSize({ axis: 'both', transition: fastTransition })
    reportContentSize(120, 40)
    reportContentSize(260, 180)
    await waitFor(() => {
      expect(getContainer().style.width).toBe('260px')
      expect(getContainer().style.height).toBe('180px')
    })
  })

  it('applies the final size immediately when reduced motion is preferred', () => {
    motionState.prefersReducedMotion = true
    renderAutoSize({ transition: { type: 'tween', duration: 10 } })
    reportContentSize(320, 96)
    reportContentSize(320, 240)
    expect(getContainer().style.height).toBe('240px')
    expect(getContainer()).not.toHaveAttribute('data-animating')
  })

  it('settles on the latest content size after rapid updates', async () => {
    renderAutoSize({ transition: fastTransition })
    reportContentSize(320, 96)
    reportContentSize(320, 200)
    reportContentSize(320, 120)
    reportContentSize(320, 160)
    await waitFor(() => {
      expect(getContainer().style.height).toBe('160px')
    })
    await waitFor(() => {
      expect(getContainer()).not.toHaveAttribute('data-animating')
    })
  })

  it('skips animation when the measured size has not changed', () => {
    renderAutoSize({ transition: { type: 'tween', duration: 1 } })
    reportContentSize(320, 96)
    reportContentSize(320, 96)
    expect(getContainer()).not.toHaveAttribute('data-animating')
  })

  it('disconnects the ResizeObserver on unmount', () => {
    const { unmount } = renderAutoSize()
    const observer = observers[0]
    unmount()
    expect(observer?.disconnect).toHaveBeenCalledTimes(1)
  })
})
