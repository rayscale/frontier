import type { KeyboardEvent, MouseEvent } from 'react'

interface TToggleHandlers {
  onClick: (event: MouseEvent<HTMLInputElement>) => void
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
}

/**
 * Gives a native toggle input the shared keyboard and disabled behavior: Enter toggles like Space,
 * and an unavailable toggle stays focusable but ignores activation.
 */
export function createToggleHandlers(
  unavailable: boolean,
  onClick: ((event: MouseEvent<HTMLInputElement>) => void) | undefined,
  onKeyDown: ((event: KeyboardEvent<HTMLInputElement>) => void) | undefined,
): TToggleHandlers {
  return {
    onClick: (event) => {
      if (unavailable) {
        event.preventDefault()
        event.stopPropagation()

        return
      }

      onClick?.(event)
    },
    onKeyDown: (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        event.currentTarget.click()
      } else if (unavailable && event.key === ' ') {
        event.preventDefault()
      }

      onKeyDown?.(event)
    },
  }
}
