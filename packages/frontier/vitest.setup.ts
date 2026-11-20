import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

import '@testing-library/jest-dom/vitest'

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class {
    public observe(): void {
      return undefined
    }

    public unobserve(): void {
      return undefined
    }

    public disconnect(): void {
      return undefined
    }
  }
}

if (typeof Element.prototype.getAnimations === 'undefined') {
  Element.prototype.getAnimations = () => []
}

afterEach(() => {
  cleanup()
})

for (const method of ['hasPointerCapture', 'setPointerCapture', 'releasePointerCapture'] as const) {
  if (typeof Element.prototype[method] === 'undefined') {
    Element.prototype[method] = (): boolean => false
  }
}
