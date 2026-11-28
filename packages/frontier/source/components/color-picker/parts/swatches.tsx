import { forwardRef, useId } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { selectEdgeRadioOnKeyDown } from '../../../internal/helpers/radio-edge-keys.js'
import { ColorSwatch } from '../../color-swatch/color-swatch.js'
import { useColorControl } from '../context.js'
import { isSameColor, parseColor } from '../helpers/color.js'
import type { TColorSwatchesProps } from '../types.js'

import '../../../internal/styles/visually-hidden.css'

export const ColorPickerSwatches = forwardRef<HTMLDivElement, TColorSwatchesProps>(
  function ColorPickerSwatches(
    {
      alpha,
      className,
      colors,
      defaultValue,
      disabled,
      format,
      label = 'Colors',
      onKeyDown,
      onValueChange,
      value,
      ...props
    },
    ref,
  ) {
    const name = useId()
    const control = useColorControl({
      alpha,
      defaultValue,
      disabled,
      format,
      onValueChange,
      value,
    })

    return (
      <div
        role="radiogroup"
        aria-label={label}
        {...props}
        ref={ref}
        className={classNames('frontier-color-swatches', className)}
        onKeyDown={(event) => {
          onKeyDown?.(event)
          selectEdgeRadioOnKeyDown(event)
        }}
      >
        {colors.map((color) => (
          <label key={color} className="frontier-color-swatches__item">
            <input
              aria-label={color}
              checked={isSameColor(color, control.value)}
              className="frontier-color-swatches__input frontier-visually-hidden"
              disabled={control.disabled}
              name={name}
              type="radio"
              value={color}
              onChange={() => {
                const parsed = parseColor(color)
                if (parsed) {
                  control.setColor(parsed)
                }
              }}
            />
            <ColorSwatch
              aria-hidden="true"
              className="frontier-color-swatches__swatch"
              color={color}
            />
          </label>
        ))}
      </div>
    )
  },
)
