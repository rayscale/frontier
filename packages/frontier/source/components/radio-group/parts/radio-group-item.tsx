import { forwardRef, type KeyboardEvent, type MouseEvent, useId } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { Label } from '../../label/index.js'
import { useRadioGroupContext } from '../context.js'
import type { TRadioGroupItemProps } from '../types.js'

// Native radios move the selection with the arrow keys only, so Home and End are added here.
function selectEdgeOption(input: HTMLInputElement, edge: 'first' | 'last'): void {
  const options = Array.from(
    input.closest('fieldset')?.querySelectorAll<HTMLInputElement>('input[type="radio"]') ?? [],
  ).filter((option) => option.name === input.name && !option.disabled)
  const target = edge === 'first' ? options[0] : options[options.length - 1]

  target?.focus()
  target?.click()
}

export const RadioGroupItem = forwardRef<HTMLInputElement, TRadioGroupItemProps>(
  function RadioGroupItem(props, ref) {
    const {
      className,
      description,
      disabled = false,
      disabledReason,
      id,
      label,
      onChange,
      onClick,
      onKeyDown,
      value,
      'aria-describedby': ariaDescribedBy,
      ...rest
    } = props
    const group = useRadioGroupContext()
    const generatedId = useId()
    const descriptionId = useId()
    const inputId = id ?? generatedId
    const unavailable = group.disabled || disabled
    const support = disabled ? disabledReason : description
    const describedByIds = [
      ariaDescribedBy,
      support ? descriptionId : undefined,
      group.errorId,
    ].filter(Boolean)
    const describedBy = describedByIds.length > 0 ? describedByIds.join(' ') : undefined
    const classes = classNames('frontier-radio-group__item', className)

    const handleClick = (event: MouseEvent<HTMLInputElement>): void => {
      if (group.disabled) {
        event.preventDefault()
        event.stopPropagation()

        return
      }

      onClick?.(event)
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === 'Enter') {
        event.preventDefault()
        event.currentTarget.click()
      } else if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault()
        selectEdgeOption(event.currentTarget, event.key === 'Home' ? 'first' : 'last')
      } else if (group.disabled && event.key === ' ') {
        event.preventDefault()
      }

      onKeyDown?.(event)
    }

    return (
      <div className={classes} data-disabled={unavailable ? true : undefined}>
        <Label className="frontier-radio-group__option" htmlFor={inputId}>
          <span className="frontier-radio-group__control">
            <input
              {...rest}
              ref={ref}
              id={inputId}
              type="radio"
              name={group.name}
              value={value}
              className="frontier-radio-group__input"
              checked={group.selectedValue === value}
              required={group.required}
              disabled={disabled}
              aria-disabled={group.disabled || undefined}
              aria-describedby={describedBy}
              aria-invalid={group.invalid ? true : undefined}
              onChange={(event) => {
                if (group.disabled) {
                  return
                }

                onChange?.(event)
                group.onSelect(value)
              }}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
            />
            <span className="frontier-radio-group__mark" aria-hidden="true">
              <span className="frontier-radio-group__dot" />
            </span>
          </span>
          <span className="frontier-radio-group__text">{label}</span>
        </Label>
        {support ? (
          <span className="frontier-radio-group__option-description" id={descriptionId}>
            {support}
          </span>
        ) : null}
      </div>
    )
  },
)
