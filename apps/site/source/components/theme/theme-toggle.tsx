'use client'

import { Button, Laptop, Moon, Sun } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import { type TThemePreference, useTheme } from './theme-provider.js'

const order: TThemePreference[] = ['light', 'dark', 'system']

const symbols = {
  light: Sun,
  dark: Moon,
  system: Laptop,
}

/** A button that cycles the theme through light, dark, and system. */
export function ThemeToggle(): ReactElement {
  const { preference, setPreference } = useTheme()
  const next = order[(order.indexOf(preference) + 1) % order.length] ?? 'system'
  const Current = symbols[preference]

  return (
    <Button
      variant="ghost"
      size="symbol"
      aria-label={`Theme: ${preference}. Switch to ${next}.`}
      onClick={() => {
        setPreference(next)
      }}
    >
      <Current aria-hidden="true" />
    </Button>
  )
}
