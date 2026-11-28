import { forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import type { TCssCustomProperties } from '../../../internal/helpers/css-custom-properties.js'
import { useColorControl } from '../context.js'
import { toCssColor } from '../helpers/color.js'
import { usePointerDrag } from '../hooks/use-pointer-drag.js'
import type { TColorAreaProps } from '../types.js'

import '../../../internal/styles/visually-hidden.css'

function clamp(value: number): number {
  return Math.min(1, Math.max(0, value))
}

export const ColorPickerArea = forwardRef<HTMLDivElement, TColorAreaProps>(function ColorPickerArea(
  {
    alpha,
    brightnessLabel = 'Brightness',
    className,
    defaultValue,
    disabled,
    format,
    onValueChange,
    saturationLabel = 'Saturation',
    style,
    value,
    ...props
  },
  ref,
) {
  const {
    color,
    disabled: disabledState,
    setColor,
  } = useColorControl({
    alpha,
    defaultValue,
    disabled,
    format,
    onValueChange,
    value,
  })
  const drag = usePointerDrag(({ rect, x, y }) => {
    setColor({
      ...color,
      saturation: clamp((x - rect.left) / rect.width) * 100,
      brightness: (1 - clamp((y - rect.top) / rect.height)) * 100,
    })
  }, disabledState)
  const customProperties: TCssCustomProperties = {
    '--_hue': toCssColor({ hue: color.hue, saturation: 100, brightness: 100, alpha: 1 }),
    '--_thumb-color': toCssColor({ ...color, alpha: 1 }),
    '--_x': `${String(color.saturation)}%`,
    '--_y': `${String(100 - color.brightness)}%`,
  }

  return (
    <div
      aria-label="Color"
      role="group"
      {...props}
      ref={ref}
      className={classNames('frontier-color-area', className)}
      data-dragging={drag.dragging ? '' : undefined}
      data-disabled={disabledState ? '' : undefined}
      style={{ ...customProperties, ...style }}
      onPointerCancel={drag.onPointerCancel}
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
    >
      <div className="frontier-color-area__thumb">
        <input
          aria-label={saturationLabel}
          aria-valuetext={`${String(Math.round(color.saturation))}%`}
          className="frontier-visually-hidden"
          disabled={disabledState}
          max={100}
          min={0}
          step={1}
          type="range"
          value={Math.round(color.saturation)}
          onChange={(event) => {
            setColor({ ...color, saturation: Number(event.currentTarget.value) })
          }}
        />
        <input
          aria-label={brightnessLabel}
          aria-orientation="vertical"
          aria-valuetext={`${String(Math.round(color.brightness))}%`}
          className="frontier-visually-hidden"
          disabled={disabledState}
          max={100}
          min={0}
          step={1}
          type="range"
          value={Math.round(color.brightness)}
          onChange={(event) => {
            setColor({ ...color, brightness: Number(event.currentTarget.value) })
          }}
        />
      </div>
    </div>
  )
})
