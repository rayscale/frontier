import { type ChangeEvent, forwardRef, useId } from 'react'

import { useRadioGroupContext } from '../context.js'
import type { TRadioGroupItemProps } from '../types.js'

export const RadioGroupItem = forwardRef<HTMLInputElement, TRadioGroupItemProps>(
  function RadioGroupItem(
    {
      className,
      description,
      disabled: itemDisabled = false,
      id,
      label,
      onChange,
      value,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref,
  ) {
    const group = useRadioGroupContext('RadioGroupItem')
    const generatedId = useId()
    const inputId = id ?? generatedId
    const descriptionId = description ? `${inputId}-description` : undefined
    const describedBy = [ariaDescribedBy, descriptionId].filter(Boolean).join(' ') || undefined
    const disabled = group.disabled || itemDisabled

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event)
      group.onSelect(value)
    }

    return (
      <div className="frontier-radio-group__item" data-disabled={disabled || undefined}>
        <label className="frontier-radio-group__option" htmlFor={inputId}>
          <span className="frontier-radio-group__control">
            <input
              {...props}
              ref={ref}
              id={inputId}
              type="radio"
              name={group.name}
              value={value}
              className={['frontier-radio-group__input', className].filter(Boolean).join(' ')}
              checked={group.selectedValue === value}
              onChange={handleChange}
              disabled={disabled}
              required={group.required}
              aria-describedby={describedBy}
            />
            <span className="frontier-radio-group__indicator" aria-hidden="true" />
          </span>
          {label && <span className="frontier-radio-group__text">{label}</span>}
        </label>
        {description && (
          <span className="frontier-radio-group__item-description" id={descriptionId}>
            {description}
          </span>
        )}
      </div>
    )
  },
)
