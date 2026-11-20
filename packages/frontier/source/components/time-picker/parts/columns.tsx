import type { ReactElement, ReactNode } from 'react'

import { revealSelection } from '../helpers/reveal-selection.js'
import '../../../internal/styles/visually-hidden.css'

interface TTimeColumnProps {
  legend: string
  children: ReactNode
}

export function TimeColumn({ legend, children }: TTimeColumnProps): ReactElement {
  return (
    <fieldset className="frontier-time-picker__column">
      <legend className="frontier-time-picker__legend">{legend}</legend>
      <div className="frontier-time-picker__list" ref={revealSelection}>
        {children}
      </div>
    </fieldset>
  )
}

interface TTimeOptionProps {
  name: string
  value: string
  label: string
  checked: boolean
  disabled: boolean
  highlighted: boolean
  onHover: (hovering: boolean) => void
  onSelect: () => void
}

export function TimeOption({
  name,
  value,
  label,
  checked,
  disabled,
  highlighted,
  onHover,
  onSelect,
}: TTimeOptionProps): ReactElement {
  return (
    <label
      className="frontier-time-picker__option"
      data-selected={checked ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      data-highlighted={highlighted ? '' : undefined}
      onPointerEnter={() => {
        onHover(true)
      }}
      onPointerLeave={() => {
        onHover(false)
      }}
    >
      <input
        className="frontier-time-picker__input frontier-visually-hidden"
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onSelect}
      />
      <span>{label}</span>
    </label>
  )
}
