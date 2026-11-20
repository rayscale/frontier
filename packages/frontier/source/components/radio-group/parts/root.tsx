import { forwardRef, useId, useState } from 'react'

import { selectEdgeRadioOnKeyDown } from '../../../internal/helpers/radio-edge-keys.js'
import { radioGroupContext } from '../context.js'
import type { TRadioGroupProps } from '../types.js'

export const RadioGroupRoot = forwardRef<HTMLFieldSetElement, TRadioGroupProps>(
  function RadioGroupRoot(
    {
      className,
      children,
      defaultValue,
      description,
      disabled = false,
      label,
      name,
      onValueChange,
      orientation = 'vertical',
      required = false,
      size = 'medium',
      value,
      'aria-describedby': ariaDescribedBy,
      onKeyDown,
      ...props
    },
    ref,
  ) {
    const generatedName = useId()
    const groupId = useId()
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
    const controlled = value !== undefined
    const selectedValue = controlled ? value : uncontrolledValue
    const descriptionId = description ? `${groupId}-description` : undefined
    const describedBy = [ariaDescribedBy, descriptionId].filter(Boolean).join(' ') || undefined

    const contextValue = {
      name: name ?? generatedName,
      selectedValue,
      disabled,
      required,
      onSelect: (nextValue: string) => {
        if (!controlled) {
          setUncontrolledValue(nextValue)
        }

        onValueChange?.(nextValue)
      },
    }

    return (
      <radioGroupContext.Provider value={contextValue}>
        <fieldset
          {...props}
          ref={ref}
          className={[
            'frontier-radio-group',
            `frontier-radio-group--${size}`,
            `frontier-radio-group--${orientation}`,
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-describedby={describedBy}
          disabled={disabled}
          data-disabled={disabled || undefined}
          onKeyDown={(event) => {
            onKeyDown?.(event)
            if (!event.defaultPrevented) {
              selectEdgeRadioOnKeyDown(event)
            }
          }}
        >
          {label && <legend className="frontier-radio-group__label">{label}</legend>}
          {description && (
            <span className="frontier-radio-group__description" id={descriptionId}>
              {description}
            </span>
          )}
          <div className="frontier-radio-group__options">{children}</div>
        </fieldset>
      </radioGroupContext.Provider>
    )
  },
)
