import { forwardRef, type ReactNode, type TextareaHTMLAttributes, useId } from 'react'

import { classNames } from '../../internal/helpers/class-names.js'
import { omitUndefined } from '../../internal/helpers/omit-undefined.js'
import { Field } from '../field/field.js'

import './textarea.css'

/** Props for a multi-line text input with an optional label, description, and error. */
export type TTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /** Grows and shrinks the field with its content instead of scrolling. Needs `field-sizing` support. */
  autoSize?: boolean | undefined
  /** Helper text associated with the textarea for assistive technologies. */
  description?: ReactNode | undefined
  /** Error message associated with the textarea; also marks it as invalid. */
  error?: ReactNode | undefined
  /** Marks the textarea as invalid even when no error is displayed. */
  invalid?: boolean | undefined
  /** Visible label associated with the native textarea. */
  label?: ReactNode | undefined
  /** Whether people can drag the corner to change the height. Defaults to `vertical`. */
  resize?: 'none' | 'vertical' | undefined
}

/**
 * Renders a native textarea with an optional label, description, and error.
 * Forwards its ref to the native textarea.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TTextareaProps>(function Textarea(
  {
    autoSize = false,
    className,
    description,
    error,
    id,
    invalid = false,
    label,
    resize = 'vertical',
    rows = 3,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    'aria-invalid': ariaInvalid,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const textareaId = id ?? generatedId
  const descriptionId = description ? `${textareaId}-description` : undefined
  const errorId = error ? `${textareaId}-error` : undefined
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
      {label && <Field.Label htmlFor={textareaId}>{label}</Field.Label>}
      <Field.Box className="frontier-textarea__box">
        <textarea
          {...omitUndefined(props)}
          ref={ref}
          id={textareaId}
          rows={rows}
          className={classNames(
            'frontier-field__control',
            'frontier-textarea',
            resize === 'none' && 'frontier-textarea--fixed',
            autoSize && 'frontier-textarea--auto-size',
            className,
          )}
          aria-describedby={describedBy}
          aria-invalid={invalidAttribute}
          aria-errormessage={errorMessage}
        />
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
