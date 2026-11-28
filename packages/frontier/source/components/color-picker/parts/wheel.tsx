import { forwardRef, useState } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import type { TCssCustomProperties } from '../../../internal/helpers/css-custom-properties.js'
import { useColorControl } from '../context.js'
import { getHueFromPoint, getShortestTurn, getWheelGradient, toCssColor } from '../helpers/color.js'
import { usePointerDrag } from '../hooks/use-pointer-drag.js'
import type { TColorWheelProps } from '../types.js'

import '../../../internal/styles/visually-hidden.css'

export const ColorPickerWheel = forwardRef<HTMLDivElement, TColorWheelProps>(
  function ColorPickerWheel(
    {
      alpha,
      className,
      defaultValue,
      disabled,
      format,
      label = 'Hue',
      onValueChange,
      style,
      thickness = 20,
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
    // The arm keeps turning the short way, so its glide never spins back through the whole circle.
    const [turn, setTurn] = useState(color.hue)
    const nextTurn = getShortestTurn(turn, color.hue)
    if (nextTurn !== turn) {
      setTurn(nextTurn)
    }

    const drag = usePointerDrag(
      ({ rect, x, y }) => {
        setColor({
          ...color,
          hue: getHueFromPoint(x, y, rect.left + rect.width / 2, rect.top + rect.height / 2),
        })
      },
      disabledState,
      ({ rect, x, y }) => {
        const distance = Math.hypot(
          x - (rect.left + rect.width / 2),
          y - (rect.top + rect.height / 2),
        )

        return distance >= rect.width / 2 - thickness
      },
    )
    const customProperties: TCssCustomProperties = {
      '--_gradient': getWheelGradient(),
      '--_hue': `${String(nextTurn)}deg`,
      '--_thickness': `${String(thickness)}px`,
      '--_thumb-color': toCssColor({
        hue: color.hue,
        saturation: 100,
        brightness: 100,
        alpha: 1,
      }),
    }

    return (
      <div
        {...props}
        ref={ref}
        className={classNames('frontier-color-wheel', className)}
        data-dragging={drag.dragging ? '' : undefined}
        data-disabled={disabledState ? '' : undefined}
        style={{ ...customProperties, ...style }}
        onPointerCancel={drag.onPointerCancel}
        onPointerDown={drag.onPointerDown}
        onPointerMove={drag.onPointerMove}
        onPointerUp={drag.onPointerUp}
      >
        <div className="frontier-color-wheel__ring" />
        <div className="frontier-color-wheel__arm">
          <div className="frontier-color-wheel__thumb">
            <input
              aria-label={label}
              aria-valuetext={`${String(Math.round(color.hue))} degrees`}
              className="frontier-visually-hidden"
              disabled={disabledState}
              max={360}
              min={0}
              step={1}
              type="range"
              value={Math.round(color.hue)}
              onChange={(event) => {
                setColor({ ...color, hue: Number(event.currentTarget.value) })
              }}
            />
          </div>
        </div>
      </div>
    )
  },
)
