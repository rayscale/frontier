'use client'

import { Button, Laptop, Moon, Sun } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import { type TModePreference, useMode } from './mode-provider.js'

const order: TModePreference[] = ['light', 'dark', 'system']

const symbols = {
  light: Sun,
  dark: Moon,
  system: Laptop,
}

/** A button that cycles the mode through light, dark, and system. */
export function ModeToggle(): ReactElement {
  const { preference, setPreference } = useMode()
  const next = order[(order.indexOf(preference) + 1) % order.length] ?? 'system'
  const Current = symbols[preference]

  return (
    <Button
      variant="ghost"
      size="symbol"
      aria-label={`Mode: ${preference}. Switch to ${next}.`}
      onClick={() => {
        setPreference(next)
      }}
    >
      <Current aria-hidden="true" />
    </Button>
  )
}
