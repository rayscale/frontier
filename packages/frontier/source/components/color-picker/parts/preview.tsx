import { forwardRef } from 'react'

import { ColorSwatch } from '../../color-swatch/color-swatch.js'
import { useColorControl } from '../context.js'
import { toCssColor } from '../helpers/color.js'
import type { TColorPickerPreviewProps } from '../types.js'

export const ColorPickerPreview = forwardRef<HTMLSpanElement, TColorPickerPreviewProps>(
  function ColorPickerPreview({ label, ...props }, ref) {
    const { color, value } = useColorControl({})

    return <ColorSwatch {...props} ref={ref} color={toCssColor(color)} label={label ?? value} />
  },
)
