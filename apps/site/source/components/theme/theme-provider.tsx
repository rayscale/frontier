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

import { useSystemDark } from './system-theme.js'
import { themeStorageKey } from './theme-script.js'

/** What the visitor chose. `system` follows the operating system. */
export type TThemePreference = 'light' | 'dark' | 'system'

/** The color mode that applies. */
export type TResolvedTheme = 'light' | 'dark'

export interface TThemeContext {
  preference: TThemePreference
  resolved: TResolvedTheme
  setPreference: (preference: TThemePreference) => void
}

const themeContext = createContext<TThemeContext | null>(null)

function isPreference(value: unknown): value is TThemePreference {
  return value === 'light' || value === 'dark' || value === 'system'
}

function resolveTheme(preference: TThemePreference, systemDark: boolean): TResolvedTheme {
  if (preference !== 'system') {
    return preference
  }

  return systemDark ? 'dark' : 'light'
}

function readStoredPreference(): TThemePreference {
  try {
    const stored = window.localStorage.getItem(themeStorageKey)

    return isPreference(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

/** Keeps the theme preference, remembers it, and applies it as `data-theme` on the root element. */
export function ThemeProvider({ children }: { children: ReactNode }): ReactElement {
  // The page is rendered once for everyone, so the stored choice is read after it hydrates. An
  // inline script in the document head applies it before the first paint.
  const [preference, setStoredPreference] = useState<TThemePreference>('system')
  const [ready, setReady] = useState(false)
  const systemDark = useSystemDark()
  const resolved = resolveTheme(preference, systemDark)

  useEffect(() => {
    setStoredPreference(readStoredPreference())
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) {
      document.documentElement.dataset.theme = resolved
    }
  }, [ready, resolved])

  const setPreference = useCallback((next: TThemePreference) => {
    setStoredPreference(next)

    try {
      window.localStorage.setItem(themeStorageKey, next)
    } catch {
      return
    }
  }, [])

  const value = useMemo(
    () => ({ preference, resolved, setPreference }),
    [preference, resolved, setPreference],
  )

  return <themeContext.Provider value={value}>{children}</themeContext.Provider>
}

/** Reads the theme and changes it. Must be used inside `ThemeProvider`. */
export function useTheme(): TThemeContext {
  const context = useContext(themeContext)

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider.')
  }

  return context
}
