import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from 'react'

import { omitUndefined } from '../../internal/helpers/omit-undefined.js'
import { Field } from '../field/field.js'

/** Props for an input with an optional label, description, error, and adornments. */
export type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Helper text associated with the input for assistive technologies. */
  description?: ReactNode | undefined
  /** Error message associated with the input; also marks it as invalid. */
  error?: ReactNode | undefined
  /** Marks the input as invalid even when no error is displayed. */
  invalid?: boolean | undefined
  /** Visible label associated with the native input. */
  label?: ReactNode | undefined
  /** Decorative or interactive content displayed before the value. */
  leadingSymbol?: ReactNode | undefined
  /** Prevents assistive technologies from hiding the leading adornment. */
  leadingSymbolInteractive?: boolean | undefined
  /** Decorative or interactive content displayed after the value. */
  trailingSymbol?: ReactNode | undefined
  /** Prevents assistive technologies from hiding the trailing adornment. */
  trailingSymbolInteractive?: boolean | undefined
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
    leadingSymbol,
    leadingSymbolInteractive = false,
    trailingSymbol,
    trailingSymbolInteractive = false,
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
        {leadingSymbol && (
          <span
            className="frontier-field__symbol"
            aria-hidden={leadingSymbolInteractive ? undefined : true}
          >
            {leadingSymbol}
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
        {trailingSymbol && (
          <span
            className="frontier-field__symbol"
            aria-hidden={trailingSymbolInteractive ? undefined : true}
          >
            {trailingSymbol}
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
