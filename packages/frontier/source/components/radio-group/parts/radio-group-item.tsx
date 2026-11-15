import { forwardRef, useId } from 'react'

import { Label } from '../../label/index.js'
import { useRadioGroupContext } from '../context.js'
import type { TRadioGroupItemProps } from '../types.js'

export const RadioGroupItem = forwardRef<HTMLInputElement, TRadioGroupItemProps>(
  function RadioGroupItem(props, ref) {
    const {
      className,
      description,
      disabled = false,
      id,
      label,
      onChange,
      value,
      'aria-describedby': ariaDescribedBy,
      ...rest
    } = props
    const group = useRadioGroupContext()
    const generatedId = useId()
    const descriptionId = useId()
    const inputId = id ?? generatedId
    const unavailable = group.disabled || disabled
    const describedByIds = [ariaDescribedBy, description ? descriptionId : undefined].filter(
      Boolean,
    )
    const describedBy = describedByIds.length > 0 ? describedByIds.join(' ') : undefined
    const classes = ['frontier-radio-group__input', className].filter(Boolean).join(' ')

    return (
      <div className="frontier-radio-group__item" data-disabled={unavailable ? true : undefined}>
        <Label className="frontier-radio-group__option" htmlFor={inputId}>
          <span className="frontier-radio-group__control">
            <input
              {...rest}
              ref={ref}
              id={inputId}
              type="radio"
              name={group.name}
              value={value}
              className={classes}
              checked={group.selectedValue === value}
              required={group.required}
              disabled={unavailable}
              aria-describedby={describedBy}
              aria-invalid={group.invalid ? true : undefined}
              onChange={(event) => {
                onChange?.(event)
                group.onSelect(value)
              }}
            />
            <span className="frontier-radio-group__mark" aria-hidden="true">
              <span className="frontier-radio-group__dot" />
            </span>
          </span>
          <span className="frontier-radio-group__text">{label}</span>
        </Label>
        {description ? (
          <span className="frontier-radio-group__option-description" id={descriptionId}>
            {description}
          </span>
        ) : null}
      </div>
    )
  },
)
