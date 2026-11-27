import { OTPInput, REGEXP_ONLY_DIGITS } from 'input-otp'
import { type ComponentPropsWithoutRef, forwardRef, Fragment, type ReactNode, useId } from 'react'

import { classNames } from '../../internal/helpers/class-names.js'
import { omitUndefined } from '../../internal/helpers/omit-undefined.js'
import { Field } from '../field/field.js'

import './input-otp.css'

/** Props for a one-time code input with an optional label, description, and error. */
export type TInputOTPProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'children' | 'maxLength' | 'minLength' | 'onChange' | 'pattern' | 'size' | 'type' | 'value'
> & {
  /** Helper text associated with the input for assistive technologies. */
  description?: ReactNode | undefined
  /** Error message associated with the input; also marks it as invalid. */
  error?: ReactNode | undefined
  /**
   * Number of characters in each group, separated by a divider. The sizes must add up to
   * `length`; otherwise the characters are shown as one group.
   */
  groups?: readonly number[] | undefined
  /** Marks the input as invalid even when no error is displayed. */
  invalid?: boolean | undefined
  /** Visible label associated with the input. */
  label?: ReactNode | undefined
  /** Number of characters in the code. Defaults to 6. */
  length?: number | undefined
  /** Called when the code changes, with the characters entered so far. */
  onValueChange?: ((value: string) => void) | undefined
  /** Called once every character has been entered, with the complete code. */
  onComplete?: ((value: string) => void) | undefined
  /** Regular expression source that every accepted character sequence must match. Defaults to digits only. */
  pattern?: string | undefined
  /** Controlled code. Pair it with `onValueChange`. */
  value?: string | undefined
}

function resolveGroups(length: number, groups: readonly number[] | undefined): readonly number[] {
  if (groups?.every((size) => size > 0) && groups.reduce((sum, size) => sum + size, 0) === length) {
    return groups
  }

  return [length]
}

/**
 * Renders a one-time code as a row of single-character slots over one native input, so typing,
 * pasting, autofill, and password managers keep working. Forwards its ref to the native input.
 */
export const InputOTP = forwardRef<HTMLInputElement, TInputOTPProps>(function InputOTP(
  {
    className,
    description,
    disabled,
    error,
    groups,
    id,
    invalid = false,
    inputMode = 'numeric',
    label,
    length = 6,
    onComplete,
    onValueChange,
    pattern = REGEXP_ONLY_DIGITS,
    readOnly,
    value,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    'aria-invalid': ariaInvalid,
    ...props
  },
  ref,
) {
  if (!Number.isInteger(length) || length < 1) {
    throw new RangeError('InputOTP length must be a positive integer.')
  }

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
  const resolvedGroups = resolveGroups(length, groups)

  return (
    <Field.Root
      data-invalid={invalidState || undefined}
      data-readonly={readOnly ? true : undefined}
      disabled={disabled}
      invalid={invalid || Boolean(error)}
    >
      {label && <Field.Label htmlFor={inputId}>{label}</Field.Label>}
      <OTPInput
        {...omitUndefined(props)}
        {...omitUndefined({ disabled, onChange: onValueChange, onComplete, readOnly, value })}
        ref={ref}
        id={inputId}
        maxLength={length}
        pattern={pattern}
        inputMode={inputMode}
        containerClassName={classNames('frontier-input-otp', className)}
        aria-describedby={describedBy}
        aria-invalid={invalidAttribute}
        aria-errormessage={errorMessage}
        render={({ slots }) =>
          resolvedGroups.map((size, groupIndex) => {
            const start = resolvedGroups.slice(0, groupIndex).reduce((sum, item) => sum + item, 0)

            return (
              <Fragment key={start}>
                {groupIndex > 0 && (
                  <span className="frontier-input-otp__separator" aria-hidden="true" />
                )}
                <span className="frontier-input-otp__group">
                  {slots.slice(start, start + size).map((slot, slotIndex) => (
                    <span
                      key={start + slotIndex}
                      className="frontier-input-otp__slot"
                      data-active={slot.isActive || undefined}
                      data-filled={slot.char ? true : undefined}
                    >
                      {slot.char}
                      {slot.hasFakeCaret && <span className="frontier-input-otp__caret" />}
                    </span>
                  ))}
                </span>
              </Fragment>
            )
          })
        }
      />
      {description && <Field.Description id={descriptionId}>{description}</Field.Description>}
      {error && (
        <Field.Error id={errorId} match aria-live="polite">
          {error}
        </Field.Error>
      )}
    </Field.Root>
  )
})
