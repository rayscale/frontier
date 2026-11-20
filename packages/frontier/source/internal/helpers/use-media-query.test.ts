import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useMediaQuery } from './use-media-query.js'

interface TFakeMediaQuery {
  matches: boolean
  listeners: Set<() => void>
}

function stubMatchMedia(initial: boolean): TFakeMediaQuery {
  const fake: TFakeMediaQuery = { matches: initial, listeners: new Set() }

  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      get matches() {
        return fake.matches
      },
      media: query,
      addEventListener: (_event: string, listener: () => void) => fake.listeners.add(listener),
      removeEventListener: (_event: string, listener: () => void) =>
        fake.listeners.delete(listener),
    })),
  )

  return fake
}

describe('useMediaQuery', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns whether the query currently matches', () => {
    stubMatchMedia(true)

    const { result } = renderHook(() => useMediaQuery('(max-width: 48rem)'))

    expect(result.current).toBe(true)
  })

  it('updates when the match changes', () => {
    const fake = stubMatchMedia(false)
    const { result } = renderHook(() => useMediaQuery('(max-width: 48rem)'))

    act(() => {
      fake.matches = true
      fake.listeners.forEach((listener) => {
        listener()
      })
    })

    expect(result.current).toBe(true)
  })

  it('stops listening when it unmounts', () => {
    const fake = stubMatchMedia(false)
    const { unmount } = renderHook(() => useMediaQuery('(max-width: 48rem)'))

    expect(fake.listeners.size).toBe(1)
    unmount()

    expect(fake.listeners.size).toBe(0)
  })

  it('returns false where matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined)

    const { result } = renderHook(() => useMediaQuery('(max-width: 48rem)'))

    expect(result.current).toBe(false)
  })
})
