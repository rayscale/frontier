import { forwardRef, useId, useState } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { RequiredMarker } from '../../../internal/primitives/required-marker/required-marker.js'
import { radioGroupContext } from '../context.js'
import type { TRadioGroupProps } from '../types.js'

export const RadioGroupRoot = forwardRef<HTMLFieldSetElement, TRadioGroupProps>(
  function RadioGroupRoot(props, ref) {
    const {
      children,
      className,
      defaultValue,
      description,
      disabled = false,
      disabledReason,
      error,
      invalid = false,
      label,
      name,
      onValueChange,
      orientation = 'vertical',
      required = false,
      value,
      'aria-describedby': ariaDescribedBy,
      ...rest
    } = props

    const generatedName = useId()
    const descriptionId = useId()
    const errorId = useId()
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
    const controlled = value !== undefined
    const selectedValue = controlled ? value : uncontrolledValue
    const unavailable = disabled
    const support = unavailable ? disabledReason : description
    const invalidValue = invalid || Boolean(error)
    const describedByIds = [
      ariaDescribedBy,
      support ? descriptionId : undefined,
      error ? errorId : undefined,
    ].filter(Boolean)
    const describedBy = describedByIds.length > 0 ? describedByIds.join(' ') : undefined
    const classes = classNames(
      'frontier-radio-group',
      `frontier-radio-group--${orientation}`,
      className,
    )
    const context = {
      disabled: unavailable,
      errorId: error ? errorId : undefined,
      invalid: invalidValue,
      name: name ?? generatedName,
      onSelect: (nextValue: string) => {
        if (!controlled) {
          setUncontrolledValue(nextValue)
        }

        onValueChange?.(nextValue)
      },
      required,
      selectedValue,
    }

    return (
      <radioGroupContext.Provider value={context}>
        <fieldset
          {...rest}
          ref={ref}
          className={classes}
          aria-describedby={describedBy}
          data-disabled={unavailable ? true : undefined}
          data-invalid={invalidValue ? true : undefined}
        >
          {label ? (
            <legend className="frontier-radio-group__label">
              {label}
              {required ? <RequiredMarker /> : null}
            </legend>
          ) : null}
          <div className="frontier-radio-group__options">{children}</div>
          {support ? (
            <span className="frontier-radio-group__description" id={descriptionId}>
              {support}
            </span>
          ) : null}
          {error ? (
            <span className="frontier-radio-group__error" id={errorId} role="alert">
              {error}
            </span>
          ) : null}
        </fieldset>
      </radioGroupContext.Provider>
    )
  },
)
