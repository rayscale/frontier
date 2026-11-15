import { forwardRef, type KeyboardEvent, type MouseEvent, useId } from 'react'

import { Check } from '../../icons/index.js'
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
    <span className={['frontier-checkbox', className].filter(Boolean).join(' ')}>
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
            onClick={handleClick}
            onKeyDown={handleKeyDown}
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
