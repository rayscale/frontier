import { useCallback, useSyncExternalStore } from 'react'

function supportsMatchMedia(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
}

/**
 * Reports whether a CSS media query currently matches and re-renders when it
 * changes. It returns `false` on the server and where `matchMedia` is missing.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      if (!supportsMatchMedia()) {
        return () => undefined
      }

      const mediaQuery = window.matchMedia(query)
      mediaQuery.addEventListener('change', callback)

      return () => {
        mediaQuery.removeEventListener('change', callback)
      }
    },
    [query],
  )
  const getSnapshot = useCallback(
    () => supportsMatchMedia() && window.matchMedia(query).matches,
    [query],
  )

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
