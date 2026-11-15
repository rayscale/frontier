import { forwardRef } from 'react'

import { Field } from '../field/field.js'

import type { TInputProps } from './types.js'

export const Input = forwardRef<HTMLInputElement, TInputProps>(function Input(props, ref) {
  const {
    className,
    description,
    disabled = false,
    disabledReason,
    error,
    id,
    invalid = false,
    label,
    leadingIcon,
    leadingIconInteractive = false,
    required = false,
    trailingIcon,
    trailingIconInteractive = false,
    ...controlProps
  } = props

  const support = disabled && disabledReason ? disabledReason : description

  return (
    <Field.Root id={id} invalid={invalid || Boolean(error)} disabled={disabled} required={required}>
      {label ? <Field.Label>{label}</Field.Label> : null}
      <Field.Box>
        {leadingIcon ? (
          <span
            className="frontier-field__icon"
            aria-hidden={leadingIconInteractive ? undefined : true}
          >
            {leadingIcon}
          </span>
        ) : null}
        <Field.Control
          {...controlProps}
          ref={ref}
          className={className}
          disabled={disabled}
          required={required}
        />
        {trailingIcon ? (
          <span
            className="frontier-field__icon"
            aria-hidden={trailingIconInteractive ? undefined : true}
          >
            {trailingIcon}
          </span>
        ) : null}
      </Field.Box>
      {support ? <Field.Description>{support}</Field.Description> : null}
      {error ? <Field.Error>{error}</Field.Error> : null}
    </Field.Root>
  )
})
