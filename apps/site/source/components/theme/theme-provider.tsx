'use client'

import { themeMetadata } from '@rayscale/frontier/theme-metadata'
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

import { defaultTheme, themeNames, themeStorageKey } from './theme-script.js'

export interface TThemeContext {
  /** The name of the theme that applies to the document. */
  theme: string
  setTheme: (theme: string) => void
}

const themeContext = createContext<TThemeContext | null>(null)

function readStoredTheme(): string {
  try {
    const stored = window.localStorage.getItem(themeStorageKey)

    return stored !== null && themeNames.includes(stored) ? stored : defaultTheme
  } catch {
    return defaultTheme
  }
}

/** Keeps the theme choice, remembers it, and applies it as `data-theme` on the root element. */
export function ThemeProvider({ children }: { children: ReactNode }): ReactElement {
  // The page is rendered once for everyone, so the stored choice is read after it hydrates. An
  // inline script in the document head applies it before the first paint.
  const [theme, setStoredTheme] = useState(defaultTheme)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setStoredTheme(readStoredTheme())
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) {
      return
    }

    if (theme === defaultTheme) {
      delete document.documentElement.dataset.theme
    } else {
      document.documentElement.dataset.theme = theme
    }
  }, [ready, theme])

  const setTheme = useCallback((next: string) => {
    if (!themeNames.includes(next)) {
      return
    }

    setStoredTheme(next)

    try {
      window.localStorage.setItem(themeStorageKey, next)
    } catch {
      return
    }
  }, [])

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme])

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

/** The title of a theme, for display. */
export function themeTitle(name: string): string {
  return themeMetadata.find((theme) => theme.name === name)?.title ?? name
}
