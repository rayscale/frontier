import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

import '@testing-library/jest-dom/vitest'

class NoopObserver {
  public observe(): void {
    return undefined
  }

  public unobserve(): void {
    return undefined
  }

  public disconnect(): void {
    return undefined
  }

  public takeRecords(): [] {
    return []
  }
}

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = NoopObserver
}

if (typeof globalThis.IntersectionObserver === 'undefined') {
  globalThis.IntersectionObserver = NoopObserver as unknown as typeof IntersectionObserver
}

if (typeof Element.prototype.getAnimations === 'undefined') {
  Element.prototype.getAnimations = () => []
}

if (typeof Element.prototype.scrollIntoView === 'undefined') {
  Element.prototype.scrollIntoView = () => undefined
}

if (typeof window.matchMedia === 'undefined') {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList
}

afterEach(() => {
  cleanup()
})
