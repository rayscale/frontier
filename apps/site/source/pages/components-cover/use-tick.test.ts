import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useTick } from './use-tick.js'

function stubMotion(reduce: boolean): void {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: reduce, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  )
}

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('useTick', () => {
  it('advances on its own at the interval', () => {
    vi.useFakeTimers()
    stubMotion(false)

    const { result } = renderHook(() => useTick(1000))

    expect(result.current).toBe(0)

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(result.current).toBe(3)
  })

  it('stays still when the visitor prefers reduced motion', () => {
    vi.useFakeTimers()
    stubMotion(true)

    const { result } = renderHook(() => useTick(1000))

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(result.current).toBe(0)
  })
})
