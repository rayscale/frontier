import { forwardRef } from 'react'

import { useFieldContext } from '../context.js'
import type { TFieldControlProps } from '../types.js'

export const FieldControl = forwardRef<HTMLInputElement, TFieldControlProps>(
  function FieldControl(props, ref) {
    const field = useFieldContext()
    const {
      className,
      disabled,
      id,
      required,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      ...rest
    } = props
    const controlId = field?.controlId ?? id
    const invalidValue =
      ariaInvalid !== undefined
        ? ariaInvalid === true || ariaInvalid === 'true'
        : (field?.invalid ?? false)
    const unavailable = field?.disabled === true || disabled === true
    const requiredValue = field?.required === true || required === true
    const describedBy =
      [field?.descriptionId, field?.errorId, ariaDescribedBy].filter(Boolean).join(' ') || undefined
    const classes = ['frontier-field__control', className].filter(Boolean).join(' ')

    return (
      <input
        {...rest}
        ref={ref}
        id={controlId}
        type={rest.type ?? 'text'}
        className={classes}
        aria-describedby={describedBy}
        aria-invalid={invalidValue || undefined}
        aria-required={requiredValue || undefined}
        required={requiredValue || undefined}
        aria-disabled={unavailable || undefined}
        readOnly={unavailable ? true : rest.readOnly}
      />
    )
  },
)
