import { forwardRef, useId } from 'react'

import { Check } from '../../icons/index.js'
import { classNames } from '../../internal/helpers/class-names.js'
import { createToggleHandlers } from '../../internal/helpers/toggle-handlers.js'
import { Label } from '../label/index.js'

import type { TCheckboxProps } from './types.js'

import './checkbox.css'

export const Checkbox = forwardRef<HTMLInputElement, TCheckboxProps>(function Checkbox(props, ref) {
  const {
    className,
    description,
    disabled = false,
    disabledReason,
    id,
    label,
    onClick,
    onKeyDown,
    'aria-describedby': ariaDescribedBy,
    ...rest
  } = props

  const generatedId = useId()
  const supportId = useId()
  const inputId = id ?? generatedId
  const unavailable = disabled
  const support = unavailable ? disabledReason : description
  const describedBy =
    [ariaDescribedBy, support ? supportId : undefined].filter(Boolean).join(' ') || undefined

  const handlers = createToggleHandlers(unavailable, onClick, onKeyDown)

  return (
    <span className={classNames('frontier-checkbox', className)}>
      <Label className="frontier-checkbox__label" htmlFor={inputId}>
        <span className="frontier-checkbox__control">
          <input
            {...rest}
            ref={ref}
            id={inputId}
            type="checkbox"
            className="frontier-checkbox__input"
            aria-describedby={describedBy}
            aria-disabled={unavailable || undefined}
            onClick={handlers.onClick}
            onKeyDown={handlers.onKeyDown}
          />
          <span className="frontier-checkbox__mark" aria-hidden="true">
            <Check />
          </span>
        </span>
        <span className="frontier-checkbox__text">{label}</span>
      </Label>
      {support ? (
        <span className="frontier-checkbox__description" id={supportId}>
          {support}
        </span>
      ) : null}
    </span>
  )
})
