import { useSyncExternalStore } from 'react'

const query = '(prefers-color-scheme: dark)'

function subscribe(callback: () => void): () => void {
  if (typeof window.matchMedia !== 'function') {
    return () => undefined
  }

  const media = window.matchMedia(query)

  media.addEventListener('change', callback)

  return () => {
    media.removeEventListener('change', callback)
  }
}

function getSnapshot(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia(query).matches
}

/** Reports whether the system asks for a dark color scheme. */
export function useSystemDark(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
