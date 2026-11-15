import { forwardRef, useId } from 'react'

import { Label } from '../../label/index.js'
import { useRadioGroupContext } from '../context.js'
import type { TRadioGroupItemProps } from '../types.js'

export const RadioGroupItem = forwardRef<HTMLInputElement, TRadioGroupItemProps>(
  function RadioGroupItem(props, ref) {
    const { className, id, label, onChange, value, ...rest } = props
    const group = useRadioGroupContext()
    const generatedId = useId()
    const inputId = id ?? generatedId
    const classes = ['frontier-radio-group__input', className].filter(Boolean).join(' ')

    return (
      <div className="frontier-radio-group__item">
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
      </div>
    )
  },
)
