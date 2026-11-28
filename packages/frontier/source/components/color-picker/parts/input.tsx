import { forwardRef, useState } from 'react'

import { Input } from '../../input/input.js'
import { useColorControl } from '../context.js'
import {
  getChannelLabel,
  getChannelRange,
  getChannelValue,
  parseColor,
  setChannelValue,
} from '../helpers/color.js'
import type { TColorInputProps } from '../types.js'

export const ColorPickerInput = forwardRef<HTMLInputElement, TColorInputProps>(
  function ColorPickerInput(
    {
      alpha,
      channel,
      defaultValue,
      disabled,
      format,
      label,
      onBlur,
      onKeyDown,
      onValueChange,
      value,
      ...props
    },
    ref,
  ) {
    const control = useColorControl({
      alpha: alpha ?? channel === 'alpha',
      defaultValue,
      disabled,
      format,
      onValueChange,
      value,
    })
    const [draft, setDraft] = useState<string | null>(null)
    const invalid = draft !== null && parseColor(draft) === null

    if (channel !== undefined) {
      const { max, min, step } = getChannelRange(channel)

      return (
        <Input
          aria-label={label === undefined ? getChannelLabel(channel) : undefined}
          label={label}
          {...props}
          ref={ref}
          disabled={control.disabled}
          max={max}
          min={min}
          step={step}
          type="number"
          value={Math.round(getChannelValue(control.color, channel))}
          onBlur={onBlur}
          onChange={(event) => {
            const next = event.currentTarget.valueAsNumber
            if (Number.isFinite(next)) {
              control.setColor(setChannelValue(control.color, channel, next))
            }
          }}
          onKeyDown={onKeyDown}
        />
      )
    }

    function commit(): void {
      if (draft === null) {
        return
      }

      const parsed = parseColor(draft)
      if (parsed) {
        control.setColor(parsed)
      }

      setDraft(null)
    }

    return (
      <Input
        aria-label={label === undefined ? 'Color' : undefined}
        label={label}
        spellCheck={false}
        {...props}
        ref={ref}
        disabled={control.disabled}
        invalid={invalid}
        type="text"
        value={draft ?? control.value}
        onBlur={(event) => {
          onBlur?.(event)
          commit()
        }}
        onChange={(event) => {
          setDraft(event.currentTarget.value)
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event)

          if (event.key === 'Enter') {
            commit()
          } else if (event.key === 'Escape') {
            setDraft(null)
          }
        }}
      />
    )
  },
)
