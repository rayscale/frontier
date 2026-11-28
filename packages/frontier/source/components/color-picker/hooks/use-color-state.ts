import { useCallback, useState } from 'react'

import { defaultColor, formatColor, parseColor } from '../helpers/color.js'
import type { TColorFormat, TColorHsba, TColorValueProps } from '../types.js'

export interface TColorState {
  readonly alpha: boolean
  readonly color: TColorHsba
  readonly format: TColorFormat
  readonly setColor: (color: TColorHsba) => void
  readonly value: string
}

/**
 * Keeps a color as hue, saturation, brightness, and alpha, and shares it as text. Keeping the
 * parts means the hue survives a gray, where the text no longer says which hue it was.
 */
export function useColorState({
  alpha = false,
  defaultValue = '#000000',
  format = 'hex',
  onValueChange,
  value,
}: TColorValueProps): TColorState {
  const [internal, setInternal] = useState<TColorHsba>(
    () => parseColor(value ?? defaultValue) ?? defaultColor,
  )

  const color = resolveColor(internal, value, format, alpha)

  const setColor = useCallback(
    (next: TColorHsba) => {
      setInternal(next)
      onValueChange?.(formatColor(next, format, alpha), {
        color: next,
        hex: formatColor(next, 'hex', alpha),
      })
    },
    [alpha, format, onValueChange],
  )

  return { alpha, color, format, setColor, value: formatColor(color, format, alpha) }
}

/**
 * A color that the parent sets wins over the one kept inside, unless the parent only repeats what
 * was sent to it, because the one kept inside still has the hue.
 */
function resolveColor(
  internal: TColorHsba,
  value: string | undefined,
  format: TColorFormat,
  alpha: boolean,
): TColorHsba {
  if (value === undefined || formatColor(internal, format, alpha) === value) {
    return internal
  }

  return parseColor(value) ?? internal
}
