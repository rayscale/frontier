import { forwardRef, useId, useState } from 'react'

import { Star } from '../../icons/index.js'
import { classNames } from '../../internal/helpers/class-names.js'
import type { TCssCustomProperties } from '../../internal/helpers/css-custom-properties.js'

import type { TRatingProps } from './types.js'

import '../../internal/styles/visually-hidden.css'
import './rating.css'

export type { TRatingProps } from './types.js'

function defaultGetLabel(value: number, max: number): string {
  return `${String(value)} of ${String(max)}`
}

function clamp(value: number, max: number): number {
  return Math.min(max, Math.max(0, value))
}

/**
 * Lets people rate something by choosing a number of shapes, or shows a rating that is already
 * given. Each choice is a native radio button, so the arrow keys, the focus, and forms work as they
 * do for any radio group. It forwards its ref and the attributes of a `div`.
 */
export const Rating = forwardRef<HTMLDivElement, TRatingProps>(function Rating(
  {
    allowClear = false,
    className,
    defaultValue = 0,
    disabled = false,
    getLabel = defaultGetLabel,
    icon,
    label,
    max = 5,
    name,
    onMouseLeave,
    onValueChange,
    precision = 1,
    readOnly = false,
    size = 'md',
    value,
    ...props
  },
  ref,
) {
  const generatedName = useId()
  const [internal, setInternal] = useState(defaultValue)
  const [hovered, setHovered] = useState<number | null>(null)
  const current = clamp(value ?? internal, max)
  const shown = hovered ?? current
  const interactive = !readOnly && !disabled
  const shapes = Array.from({ length: max }, (_, index) => index + 1)

  function change(next: number): void {
    if (value === undefined) {
      setInternal(next)
    }

    onValueChange?.(next)
  }

  const shape = icon ?? <Star />

  return (
    <div
      {...props}
      ref={ref}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={readOnly ? [label, getLabel(current, max)].filter(Boolean).join(': ') : label}
      aria-disabled={disabled || undefined}
      className={classNames('frontier-rating', `frontier-rating--${size}`, className)}
      data-disabled={disabled ? '' : undefined}
      data-readonly={readOnly ? '' : undefined}
      onMouseLeave={(event) => {
        onMouseLeave?.(event)
        setHovered(null)
      }}
    >
      {shapes.map((position) => {
        const fill = Math.min(1, Math.max(0, shown - (position - 1)))
        const customProperties: TCssCustomProperties = { '--_fill': `${String(fill * 100)}%` }
        const choices = precision === 0.5 ? [position - 0.5, position] : [position]

        return (
          <span key={position} className="frontier-rating__item" style={customProperties}>
            <span aria-hidden="true" className="frontier-rating__shape">
              {shape}
            </span>
            <span
              aria-hidden="true"
              className="frontier-rating__shape frontier-rating__shape--filled"
            >
              {shape}
            </span>
            {!readOnly &&
              choices.map((choice) => (
                <label
                  key={choice}
                  className={classNames(
                    'frontier-rating__choice',
                    precision === 0.5 && 'frontier-rating__choice--half',
                  )}
                  onMouseEnter={() => {
                    if (interactive) {
                      setHovered(choice)
                    }
                  }}
                >
                  <input
                    aria-label={getLabel(choice, max)}
                    checked={current === choice}
                    className="frontier-visually-hidden"
                    disabled={disabled}
                    name={name ?? generatedName}
                    type="radio"
                    value={choice}
                    onChange={() => {
                      change(choice)
                    }}
                    onClick={() => {
                      if (allowClear && current === choice) {
                        change(0)
                      }
                    }}
                  />
                </label>
              ))}
          </span>
        )
      })}
    </div>
  )
})
