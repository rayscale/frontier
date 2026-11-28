import { forwardRef, useId } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { Field } from '../../field/field.js'
import { inputGroupContext } from '../context.js'
import type { TInputGroupRootProps } from '../types.js'

export const InputGroupRoot = forwardRef<HTMLDivElement, TInputGroupRootProps>(
  function InputGroupRoot(
    {
      children,
      className,
      description,
      disabled = false,
      error,
      invalid = false,
      label,
      readOnly = false,
      ...props
    },
    ref,
  ) {
    const controlId = useId()
    const descriptionId = description ? `${controlId}-description` : undefined
    const errorId = error ? `${controlId}-error` : undefined
    const invalidState = invalid || Boolean(error)

    return (
      <inputGroupContext.Provider
        value={{
          controlId,
          describedBy: [descriptionId, errorId].filter(Boolean).join(' ') || undefined,
          disabled,
          errorMessage: errorId,
          invalid: invalidState,
          readOnly,
        }}
      >
        <Field.Root
          data-invalid={invalidState || undefined}
          data-readonly={readOnly || undefined}
          disabled={disabled}
          invalid={invalidState}
        >
          {label && <Field.Label htmlFor={controlId}>{label}</Field.Label>}
          <Field.Box {...props} ref={ref} className={classNames('frontier-input-group', className)}>
            {children}
          </Field.Box>
          {description && <Field.Description id={descriptionId}>{description}</Field.Description>}
          {error && (
            <Field.Error id={errorId} match aria-live="polite">
              {error}
            </Field.Error>
          )}
        </Field.Root>
      </inputGroupContext.Provider>
    )
  },
)
