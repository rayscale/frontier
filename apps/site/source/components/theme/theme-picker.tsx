'use client'

import { SegmentedControl, type TSegmentedControlOption } from '@rayscale/frontier'
import { themeMetadata } from '@rayscale/frontier/theme-metadata'
import type { ReactElement } from 'react'

import { useTheme } from './theme-provider.js'

const options = themeMetadata.map(
  (theme) => ({ label: theme.title, value: theme.name }) as const,
) satisfies readonly TSegmentedControlOption[]

/** Chooses the theme of the whole site. The choice is remembered. */
export function ThemePicker(): ReactElement {
  const { theme, setTheme } = useTheme()

  return (
    <SegmentedControl
      label="Theme"
      onChange={setTheme}
      options={options}
      size="small"
      value={theme}
    />
  )
}
