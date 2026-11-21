'use client'

import {
  createContext,
  type ReactElement,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { modeStorageKey } from './mode-script.js'
import { useSystemDark } from './system-mode.js'

/** What the visitor chose. `system` follows the operating system. */
export type TModePreference = 'light' | 'dark' | 'system'

/** The color mode that applies. */
export type TResolvedMode = 'light' | 'dark'

export interface TModeContext {
  preference: TModePreference
  resolved: TResolvedMode
  setPreference: (preference: TModePreference) => void
}

const modeContext = createContext<TModeContext | null>(null)

function isPreference(value: unknown): value is TModePreference {
  return value === 'light' || value === 'dark' || value === 'system'
}

function resolveMode(preference: TModePreference, systemDark: boolean): TResolvedMode {
  if (preference !== 'system') {
    return preference
  }

  return systemDark ? 'dark' : 'light'
}

function readStoredPreference(): TModePreference {
  try {
    const stored = window.localStorage.getItem(modeStorageKey)

    return isPreference(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

/** Keeps the mode preference, remembers it, and applies it as `data-mode` on the root element. */
export function ModeProvider({ children }: { children: ReactNode }): ReactElement {
  // The page is rendered once for everyone, so the stored choice is read after it hydrates. An
  // inline script in the document head applies it before the first paint.
  const [preference, setStoredPreference] = useState<TModePreference>('system')
  const [ready, setReady] = useState(false)
  const systemDark = useSystemDark()
  const resolved = resolveMode(preference, systemDark)

  useEffect(() => {
    setStoredPreference(readStoredPreference())
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) {
      document.documentElement.dataset.mode = resolved
    }
  }, [ready, resolved])

  const setPreference = useCallback((next: TModePreference) => {
    setStoredPreference(next)

    try {
      window.localStorage.setItem(modeStorageKey, next)
    } catch {
      return
    }
  }, [])

  const value = useMemo(
    () => ({ preference, resolved, setPreference }),
    [preference, resolved, setPreference],
  )

  return <modeContext.Provider value={value}>{children}</modeContext.Provider>
}

/** Reads the mode and changes it. Must be used inside `ModeProvider`. */
export function useMode(): TModeContext {
  const context = useContext(modeContext)

  if (!context) {
    throw new Error('useMode must be used inside ModeProvider.')
  }

  return context
}
