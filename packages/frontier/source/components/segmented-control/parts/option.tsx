import type { ReactElement } from 'react'

import type { TSegmentedControlOption } from '../types.js'

interface TSegmentedControlOptionItemProps<TValue extends string> {
  option: TSegmentedControlOption<TValue>
  index: number
  controlId: string
  groupName: string
  selectedValue: TValue | undefined
  disabled: boolean
  onSelect: (value: TValue) => void
  registerItem: (value: TValue) => (element: HTMLLabelElement | null) => void
}

export function SegmentedControlOptionItem<TValue extends string>({
  option,
  index,
  controlId,
  groupName,
  selectedValue,
  disabled,
  onSelect,
  registerItem,
}: TSegmentedControlOptionItemProps<TValue>): ReactElement {
  const selectedState = option.value === selectedValue
  const optionDisabled = disabled || Boolean(option.disabled)
  const optionId = `${controlId}-option-${String(index)}`

  return (
    <label
      ref={registerItem(option.value)}
      htmlFor={optionId}
      className="frontier-segmented-control__item"
      data-selector-item
      data-selected={selectedState || undefined}
      data-disabled={optionDisabled || undefined}
    >
      <input
        id={optionId}
        type="radio"
        className="frontier-segmented-control__input"
        name={groupName}
        value={option.value}
        checked={selectedState}
        disabled={optionDisabled}
        aria-label={option['aria-label']}
        onChange={() => {
          onSelect(option.value)
        }}
      />
      <span className="frontier-segmented-control__content">
        {option.icon && (
          <span className="frontier-segmented-control__icon" aria-hidden="true">
            {option.icon}
          </span>
        )}
        <span className="frontier-segmented-control__label">{option.label}</span>
      </span>
    </label>
  )
}
