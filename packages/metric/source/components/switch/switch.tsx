import { forwardRef, type KeyboardEvent, type MouseEvent, useId } from 'react'

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

  const handleClick = (event: MouseEvent<HTMLInputElement>): void => {
    if (unavailable) {
      event.preventDefault()
      event.stopPropagation()

      return
    }

    onClick?.(event)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.currentTarget.click()
    } else if (unavailable && event.key === ' ') {
      event.preventDefault()
    }

    onKeyDown?.(event)
  }

  return (
    <span className={['metric-switch', className].filter(Boolean).join(' ')}>
      <Label className="metric-switch__label" htmlFor={inputId}>
        <span className="metric-switch__control">
          <input
            {...rest}
            ref={ref}
            id={inputId}
            type="checkbox"
            role="switch"
            className="metric-switch__input"
            aria-describedby={describedBy}
            aria-disabled={unavailable || undefined}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          />
          <span className="metric-switch__track" aria-hidden="true">
            <span className="metric-switch__thumb" />
          </span>
        </span>
        <span className="metric-switch__text">{label}</span>
      </Label>
      {support ? (
        <span className="metric-switch__description" id={supportId}>
          {support}
        </span>
      ) : null}
    </span>
  )
})
