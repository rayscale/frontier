import { forwardRef, useId, useState } from 'react'

import { radioGroupContext } from '../context.js'
import type { TRadioGroupProps } from '../types.js'

export const RadioGroupRoot = forwardRef<HTMLFieldSetElement, TRadioGroupProps>(
  function RadioGroupRoot(props, ref) {
    const {
      children,
      className,
      defaultValue,
      label,
      name,
      onValueChange,
      required = false,
      value,
      ...rest
    } = props

    const generatedName = useId()
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
    const controlled = value !== undefined
    const selectedValue = controlled ? value : uncontrolledValue
    const classes = ['frontier-radio-group', className].filter(Boolean).join(' ')
    const context = {
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
        <fieldset {...rest} ref={ref} className={classes}>
          {label ? <legend className="frontier-radio-group__label">{label}</legend> : null}
          <div className="frontier-radio-group__options">{children}</div>
        </fieldset>
      </radioGroupContext.Provider>
    )
  },
)
