import {
  type ForwardedRef,
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useId,
  useRef,
  useState,
} from 'react'

import './switch.css'

/** Props for a checkbox exposed with switch semantics. */
export type TSwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  /** Helper text associated with the switch for assistive technologies. */
  description?: ReactNode | undefined
  /** Error message associated with the switch and announced politely. */
  error?: ReactNode | undefined
  /** Marks the switch as invalid even when no error is displayed. */
  invalid?: boolean | undefined
  /** Visible label associated with the switch. */
  label?: ReactNode | undefined
}

interface TDragState {
  pointerId: number
  startX: number
  startOffset: number
  travel: number
  offset: number
  moved: boolean
}

const dragThreshold = 3

/**
 * Renders a native checkbox with `role="switch"` and optional label,
 * description, and error. Forwards its ref to the native input.
 */
export const Switch = forwardRef<HTMLInputElement, TSwitchProps>(function Switch(
  {
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    'aria-invalid': ariaInvalid,
    className,
    description,
    error,
    id,
    invalid = false,
    label,
    ...props
  },
  ref: ForwardedRef<HTMLInputElement>,
) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const controlRef = useRef<HTMLSpanElement>(null)
  const dragRef = useRef<TDragState | null>(null)
  const suppressClickRef = useRef(false)
  const [dragging, setIsDragging] = useState(false)
  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [ref],
  )
  const generatedId = useId()
  const switchId = id ?? generatedId
  const descriptionId = description ? `${switchId}-description` : undefined
  const errorId = error ? `${switchId}-error` : undefined
  const invalidState =
    invalid ||
    Boolean(error) ||
    (ariaInvalid !== undefined && ariaInvalid !== false && ariaInvalid !== 'false')
  const describedBy =
    [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined
  const errorMessage = [ariaErrorMessage, errorId].filter(Boolean).join(' ') || undefined

  const getTravel = (control: HTMLElement) => {
    const track = control.querySelector<HTMLElement>('.frontier-switch__track')
    const thumb = control.querySelector<HTMLElement>('.frontier-switch__thumb')

    if (!track || !thumb) {
      return 0
    }

    const style = getComputedStyle(track)
    const padding = (parseFloat(style.paddingLeft) || 0) + (parseFloat(style.paddingRight) || 0)

    return Math.max(0, track.clientWidth - padding - thumb.getBoundingClientRect().width)
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLSpanElement>) => {
    suppressClickRef.current = false
    const input = inputRef.current
    const control = controlRef.current

    if (!input || !control || input.disabled || event.button !== 0) {
      return
    }

    const travel = getTravel(control)

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startOffset: input.checked ? travel : 0,
      travel,
      offset: input.checked ? travel : 0,
      moved: false,
    }

    try {
      control.setPointerCapture(event.pointerId)
    } catch (error) {
      if (!(error instanceof DOMException)) {
        throw error
      }
    }
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLSpanElement>) => {
    const drag = dragRef.current
    const control = controlRef.current

    if (!drag || !control || drag.pointerId !== event.pointerId) {
      return
    }

    const deltaX = event.clientX - drag.startX

    if (!drag.moved && Math.abs(deltaX) < dragThreshold) {
      return
    }

    drag.moved = true
    drag.offset = Math.max(0, Math.min(drag.startOffset + deltaX, drag.travel))
    control.style.setProperty('--_switch-drag-offset', `${String(drag.offset)}px`)
    control.style.setProperty(
      '--_switch-drag-progress',
      `${String(drag.travel ? (drag.offset / drag.travel) * 100 : 0)}%`,
    )
    setIsDragging(true)
  }

  const finishDrag = (event: ReactPointerEvent<HTMLSpanElement>, cancelled: boolean) => {
    const drag = dragRef.current
    const control = controlRef.current
    const input = inputRef.current

    if (drag?.pointerId !== event.pointerId) {
      return
    }

    dragRef.current = null
    setIsDragging(false)
    control?.style.removeProperty('--_switch-drag-offset')
    control?.style.removeProperty('--_switch-drag-progress')

    if (control?.hasPointerCapture(event.pointerId)) {
      control.releasePointerCapture(event.pointerId)
    }

    if (!drag.moved || cancelled) {
      return
    }

    const beChecked = drag.offset > drag.travel / 2

    if (input && beChecked !== input.checked) {
      input.click()
    }

    suppressClickRef.current = true
  }

  return (
    <div
      className="frontier-switch-field"
      data-disabled={props.disabled ? true : undefined}
      data-invalid={invalidState || undefined}
    >
      <label className="frontier-switch" htmlFor={switchId}>
        <span
          ref={controlRef}
          className="frontier-switch__control"
          data-dragging={dragging || undefined}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={(event) => {
            finishDrag(event, false)
          }}
          onPointerCancel={(event) => {
            finishDrag(event, true)
          }}
          onLostPointerCapture={(event) => {
            finishDrag(event, true)
          }}
          onClickCapture={(event) => {
            if (suppressClickRef.current) {
              suppressClickRef.current = false
              event.preventDefault()
              event.stopPropagation()
            }
          }}
        >
          <input
            {...props}
            ref={setInputRef}
            id={switchId}
            type="checkbox"
            role="switch"
            className={['frontier-switch__input', className].filter(Boolean).join(' ')}
            aria-describedby={describedBy}
            aria-invalid={invalid || Boolean(error) ? true : ariaInvalid}
            aria-errormessage={errorMessage}
          />
          <span className="frontier-switch__track" aria-hidden="true">
            <span className="frontier-switch__thumb" />
          </span>
        </span>
        {label && <span className="frontier-switch__label">{label}</span>}
      </label>
      {description && (
        <span className="frontier-switch__description" id={descriptionId}>
          {description}
        </span>
      )}
      {error && (
        <span className="frontier-switch__error" id={errorId} aria-live="polite">
          {error}
        </span>
      )}
    </div>
  )
})
