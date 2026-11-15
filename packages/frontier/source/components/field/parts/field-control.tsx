import { forwardRef } from 'react'

import { useFieldContext } from '../context.js'
import type { TFieldControlProps } from '../types.js'

type TInvalid = TFieldControlProps['aria-invalid']

function resolveInvalid(ariaInvalid: TInvalid, contextInvalid: boolean): TInvalid {
  if (ariaInvalid === true || ariaInvalid === 'true') {
    return true
  }

  if (ariaInvalid === false || ariaInvalid === 'false') {
    return false
  }

  if (ariaInvalid !== undefined) {
    return ariaInvalid
  }

  return contextInvalid
}

function toAriaBoolean(value: boolean): boolean | undefined {
  return value ? true : undefined
}

function toAriaInvalid(value: TInvalid): TInvalid {
  return value === false ? undefined : value
}

export const FieldControl = forwardRef<HTMLInputElement, TFieldControlProps>(
  function FieldControl(props, ref) {
    const field = useFieldContext()
    const {
      className,
      disabled,
      id,
      required,
      'aria-describedby': ariaDescribedBy,
      'aria-disabled': ariaDisabled,
      'aria-invalid': ariaInvalid,
      'aria-required': ariaRequired,
      ...rest
    } = props
    const controlId = field?.controlId ?? id
    const invalidValue = resolveInvalid(ariaInvalid, field?.invalid ?? false)
    const unavailable =
      field?.disabled === true ||
      disabled === true ||
      ariaDisabled === true ||
      ariaDisabled === 'true'
    const requiredValue =
      field?.required === true ||
      required === true ||
      ariaRequired === true ||
      ariaRequired === 'true'
    const describedByParts = [field?.descriptionId, field?.errorId, ariaDescribedBy].filter(Boolean)
    const describedBy = describedByParts.length > 0 ? describedByParts.join(' ') : undefined
    const classes = ['frontier-field__control', className].filter(Boolean).join(' ')

    return (
      <input
        {...rest}
        ref={ref}
        id={controlId}
        type={rest.type ?? 'text'}
        className={classes}
        aria-describedby={describedBy}
        aria-invalid={toAriaInvalid(invalidValue)}
        aria-required={toAriaBoolean(requiredValue)}
        required={toAriaBoolean(requiredValue)}
        aria-disabled={toAriaBoolean(unavailable)}
        readOnly={unavailable ? true : rest.readOnly}
      />
    )
  },
)
