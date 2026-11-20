import { forwardRef, useId } from 'react'

import { classNames } from '../../internal/helpers/class-names.js'
import { createToggleHandlers } from '../../internal/helpers/toggle-handlers.js'
import { Label } from '../label/index.js'

import type { TSwitchProps } from './types.js'

import './switch.css'

export const Switch = forwardRef<HTMLInputElement, TSwitchProps>(function Switch(props, ref) {
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
    <span className={classNames('frontier-switch', className)}>
      <Label className="frontier-switch__label" htmlFor={inputId}>
        <span className="frontier-switch__control">
          <input
            {...rest}
            ref={ref}
            id={inputId}
            type="checkbox"
            role="switch"
            className="frontier-switch__input"
            aria-describedby={describedBy}
            aria-disabled={unavailable || undefined}
            onClick={handlers.onClick}
            onKeyDown={handlers.onKeyDown}
          />
          <span className="frontier-switch__track" aria-hidden="true">
            <span className="frontier-switch__thumb" />
          </span>
        </span>
        <span className="frontier-switch__text">{label}</span>
      </Label>
      {support ? (
        <span className="frontier-switch__description" id={supportId}>
          {support}
        </span>
      ) : null}
    </span>
  )
})
