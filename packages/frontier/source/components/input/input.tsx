import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from 'react'

import { omitUndefined } from '../../internal/helpers/omit-undefined.js'
import { Field } from '../field/field.js'

/** Props for an input with an optional label, description, error, and adornments. */
export type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Helper text associated with the input for assistive technologies. */
  description?: ReactNode
  /** Error message associated with the input; also marks it as invalid. */
  error?: ReactNode
  /** Marks the input as invalid even when no error is displayed. */
  invalid?: boolean
  /** Visible label associated with the native input. */
  label?: ReactNode
  /** Decorative or interactive content displayed before the value. */
  leadingIcon?: ReactNode
  /** Prevents assistive technologies from hiding the leading adornment. */
  leadingIconInteractive?: boolean
  /** Decorative or interactive content displayed after the value. */
  trailingIcon?: ReactNode
  /** Prevents assistive technologies from hiding the trailing adornment. */
  trailingIconInteractive?: boolean
}

/**
 * Renders a native input with optional label, description, error, and leading
 * or trailing content. Forwards its ref to the native input.
 */
export const Input = forwardRef<HTMLInputElement, TInputProps>(function Input(
  {
    className,
    description,
    error,
    id,
    invalid = false,
    label,
    leadingIcon,
    leadingIconInteractive = false,
    trailingIcon,
    trailingIconInteractive = false,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    'aria-invalid': ariaInvalid,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const descriptionId = description ? `${inputId}-description` : undefined
  const errorId = error ? `${inputId}-error` : undefined
  const ariaInvalidSet =
    ariaInvalid !== undefined && ariaInvalid !== false && ariaInvalid !== 'false'
  const invalidState = invalid || Boolean(error) || ariaInvalidSet
  const describedBy =
    [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined
  const errorMessage = [ariaErrorMessage, errorId].filter(Boolean).join(' ') || undefined
  const invalidAttribute = invalid || Boolean(error) ? true : ariaInvalid

  return (
    <Field.Root
      data-invalid={invalidState || undefined}
      data-readonly={props.readOnly ? true : undefined}
      disabled={props.disabled}
      invalid={invalid || Boolean(error)}
    >
      {label && <Field.Label>{label}</Field.Label>}
      <Field.Box>
        {leadingIcon && (
          <span
            className="frontier-field__icon"
            aria-hidden={leadingIconInteractive ? undefined : true}
          >
            {leadingIcon}
          </span>
        )}
        <Field.Control
          {...props}
          ref={ref}
          id={inputId}
          {...omitUndefined({ className })}
          aria-describedby={describedBy}
          aria-invalid={invalidAttribute}
          aria-errormessage={errorMessage}
        />
        {trailingIcon && (
          <span
            className="frontier-field__icon"
            aria-hidden={trailingIconInteractive ? undefined : true}
          >
            {trailingIcon}
          </span>
        )}
      </Field.Box>
      {description && <Field.Description id={descriptionId}>{description}</Field.Description>}
      {error && (
        <Field.Error id={errorId} match aria-live="polite">
          {error}
        </Field.Error>
      )}
    </Field.Root>
  )
})
