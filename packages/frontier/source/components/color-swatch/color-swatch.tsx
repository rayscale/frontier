import { forwardRef } from 'react'

import { classNames } from '../../internal/helpers/class-names.js'
import type { TCssCustomProperties } from '../../internal/helpers/css-custom-properties.js'

import type { TColorSwatchProps } from './types.js'

import './color-swatch.css'

export type { TColorSwatchProps } from './types.js'

/**
 * Shows a color as a small circle. A color that is see-through shows a checkerboard behind it, so
 * the transparency is visible. It forwards its ref and the attributes of a `span`.
 */
export const ColorSwatch = forwardRef<HTMLSpanElement, TColorSwatchProps>(function ColorSwatch(
  { className, color, label, size = 'md', style, ...props },
  ref,
) {
  const customProperties: TCssCustomProperties = { '--_color': color }

  return (
    <span
      {...props}
      ref={ref}
      role="img"
      aria-label={label ?? color}
      className={classNames('frontier-color-swatch', `frontier-color-swatch--${size}`, className)}
      style={{ ...customProperties, ...style }}
    />
  )
})
