import { forwardRef, type MouseEvent } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { useInputGroup } from '../context.js'
import type {
  TInputGroupAddonProps,
  TInputGroupInputProps,
  TInputGroupTextareaProps,
  TInputGroupTextProps,
} from '../types.js'

function joinIds(...ids: (string | undefined)[]): string | undefined {
  return ids.filter(Boolean).join(' ') || undefined
}

export const InputGroupInput = forwardRef<HTMLInputElement, TInputGroupInputProps>(
  function InputGroupInput(
    {
      className,
      'aria-describedby': ariaDescribedBy,
      'aria-errormessage': ariaErrorMessage,
      ...props
    },
    ref,
  ) {
    const group = useInputGroup()

    return (
      <input
        {...props}
        ref={ref}
        id={group.controlId}
        disabled={group.disabled}
        readOnly={group.readOnly}
        className={classNames(
          'frontier-field__control',
          'frontier-input-group__control',
          className,
        )}
        aria-describedby={joinIds(ariaDescribedBy, group.describedBy)}
        aria-errormessage={joinIds(ariaErrorMessage, group.errorMessage)}
        aria-invalid={group.invalid || undefined}
      />
    )
  },
)

export const InputGroupTextarea = forwardRef<HTMLTextAreaElement, TInputGroupTextareaProps>(
  function InputGroupTextarea(
    {
      autoSize = true,
      className,
      rows = 3,
      'aria-describedby': ariaDescribedBy,
      'aria-errormessage': ariaErrorMessage,
      ...props
    },
    ref,
  ) {
    const group = useInputGroup()

    return (
      <textarea
        {...props}
        ref={ref}
        id={group.controlId}
        rows={rows}
        disabled={group.disabled}
        readOnly={group.readOnly}
        className={classNames(
          'frontier-field__control',
          'frontier-input-group__control',
          'frontier-input-group__textarea',
          autoSize && 'frontier-input-group__textarea--auto-size',
          className,
        )}
        aria-describedby={joinIds(ariaDescribedBy, group.describedBy)}
        aria-errormessage={joinIds(ariaErrorMessage, group.errorMessage)}
        aria-invalid={group.invalid || undefined}
      />
    )
  },
)

const interactiveSelector = 'a, button, input, select, textarea, [role="button"]'

export const InputGroupAddon = forwardRef<HTMLDivElement, TInputGroupAddonProps>(
  function InputGroupAddon({ align = 'start', className, onClick, ...props }, ref) {
    const group = useInputGroup()

    function focusField(event: MouseEvent<HTMLDivElement>) {
      onClick?.(event)

      if (event.defaultPrevented || !(event.target instanceof Element)) {
        return
      }

      if (!event.target.closest(interactiveSelector)) {
        document.getElementById(group.controlId)?.focus()
      }
    }

    return (
      <div
        {...props}
        ref={ref}
        data-align={align}
        className={classNames('frontier-input-group__addon', className)}
        onClick={focusField}
      />
    )
  },
)

export const InputGroupText = forwardRef<HTMLSpanElement, TInputGroupTextProps>(
  function InputGroupText({ className, ...props }, ref) {
    return (
      <span {...props} ref={ref} className={classNames('frontier-input-group__text', className)} />
    )
  },
)
