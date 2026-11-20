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

/** What the visitor chose. `system` follows the operating system. */
export type TThemePreference = 'light' | 'dark' | 'system'

/** The color mode that applies. */
export type TResolvedTheme = 'light' | 'dark'

export interface TThemeContext {
  preference: TThemePreference
  resolved: TResolvedTheme
  setPreference: (preference: TThemePreference) => void
}

const storageKey = 'frontier-theme'
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
    const stored = window.localStorage.getItem(storageKey)

    return isPreference(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

/** Keeps the theme preference, remembers it, and applies it as `data-theme` on the root element. */
export function ThemeProvider({ children }: { children: ReactNode }): ReactElement {
  const [preference, setStoredPreference] = useState<TThemePreference>(readStoredPreference)
  const systemDark = useSystemDark()
  const resolved = resolveTheme(preference, systemDark)

  useEffect(() => {
    document.documentElement.dataset.theme = resolved
  }, [resolved])

  const setPreference = useCallback((next: TThemePreference) => {
    setStoredPreference(next)

    try {
      window.localStorage.setItem(storageKey, next)
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
