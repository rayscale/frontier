import { forwardRef, useId, useState } from 'react'

import { checkboxGroupContext, type TCheckboxGroupContextValue } from '../context.js'
import type { TCheckboxGroupProps } from '../types.js'

export const CheckboxGroupRoot = forwardRef<HTMLFieldSetElement, TCheckboxGroupProps>(
  function CheckboxGroup(
    {
      className,
      children,
      defaultValue,
      description,
      disabled = false,
      label,
      onValueChange,
      value,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref,
  ) {
    const groupId = useId()
    const [uncontrolledValue, setUncontrolledValue] = useState<readonly string[]>(
      defaultValue ?? [],
    )
    const controlled = value !== undefined
    const selectedValues = controlled ? value : uncontrolledValue
    const descriptionId = description ? `${groupId}-description` : undefined
    const describedBy = [ariaDescribedBy, descriptionId].filter(Boolean).join(' ') || undefined

    const contextValue: TCheckboxGroupContextValue = {
      selectedValues,
      disabled,
      onToggle: (itemValue, checked) => {
        const remainingValues = selectedValues.filter(
          (selectedValue) => selectedValue !== itemValue,
        )
        const nextValues = checked ? [...remainingValues, itemValue] : remainingValues

        if (!controlled) {
          setUncontrolledValue(nextValues)
        }

        onValueChange?.(nextValues)
      },
    }

    return (
      <checkboxGroupContext.Provider value={contextValue}>
        <fieldset
          {...props}
          ref={ref}
          className={['frontier-checkbox-group', className].filter(Boolean).join(' ')}
          aria-describedby={describedBy}
          disabled={disabled}
          data-disabled={disabled || undefined}
        >
          {label && <legend className="frontier-checkbox-group__label">{label}</legend>}
          {description && (
            <span className="frontier-checkbox-group__description" id={descriptionId}>
              {description}
            </span>
          )}
          <div className="frontier-checkbox-group__options">{children}</div>
        </fieldset>
      </checkboxGroupContext.Provider>
    )
  },
)
