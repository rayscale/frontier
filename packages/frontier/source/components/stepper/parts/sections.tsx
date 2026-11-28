import { forwardRef } from 'react'

import { Check } from '../../../icons/index.js'
import { classNames } from '../../../internal/helpers/class-names.js'
import { stepperItemContext, useStepperContext, useStepperItem } from '../context.js'
import type {
  TStepperDescriptionProps,
  TStepperIndicatorProps,
  TStepperItemProps,
  TStepperListProps,
  TStepperPanelProps,
  TStepperStatus,
  TStepperTitleProps,
} from '../types.js'

import '../../../internal/styles/visually-hidden.css'

function getStatus(value: number, current: number): TStepperStatus {
  if (value < current) {
    return 'completed'
  }

  return value === current ? 'current' : 'upcoming'
}

export const StepperList = forwardRef<HTMLOListElement, TStepperListProps>(function StepperList(
  { className, ...props },
  ref,
) {
  return <ol {...props} ref={ref} className={classNames('frontier-stepper__list', className)} />
})

export const StepperItem = forwardRef<HTMLLIElement, TStepperItemProps>(function StepperItem(
  { children, className, disabled = false, value, ...props },
  ref,
) {
  const stepper = useStepperContext()
  const status = getStatus(value, stepper.current)
  const content = (
    <>
      {status === 'completed' && (
        <span className="frontier-visually-hidden">{stepper.completedLabel}</span>
      )}
      {children}
    </>
  )

  return (
    <stepperItemContext.Provider value={{ status, value }}>
      <li
        {...props}
        ref={ref}
        data-status={status}
        aria-current={status === 'current' ? 'step' : undefined}
        className={classNames('frontier-stepper__item', className)}
      >
        {stepper.interactive ? (
          <button
            type="button"
            className="frontier-stepper__step"
            disabled={disabled}
            onClick={() => {
              stepper.select(value)
            }}
          >
            {content}
          </button>
        ) : (
          <div className="frontier-stepper__step">{content}</div>
        )}
      </li>
    </stepperItemContext.Provider>
  )
})

export const StepperIndicator = forwardRef<HTMLSpanElement, TStepperIndicatorProps>(
  function StepperIndicator({ children, className, ...props }, ref) {
    const item = useStepperItem()
    const fallback = item.status === 'completed' ? <Check /> : item.value

    return (
      <span
        {...props}
        ref={ref}
        aria-hidden="true"
        className={classNames('frontier-stepper__indicator', className)}
      >
        {children ?? fallback}
      </span>
    )
  },
)

export const StepperTitle = forwardRef<HTMLSpanElement, TStepperTitleProps>(function StepperTitle(
  { className, ...props },
  ref,
) {
  return <span {...props} ref={ref} className={classNames('frontier-stepper__title', className)} />
})

export const StepperDescription = forwardRef<HTMLSpanElement, TStepperDescriptionProps>(
  function StepperDescription({ className, ...props }, ref) {
    return (
      <span
        {...props}
        ref={ref}
        className={classNames('frontier-stepper__description', className)}
      />
    )
  },
)

export const StepperPanel = forwardRef<HTMLDivElement, TStepperPanelProps>(function StepperPanel(
  { className, value, ...props },
  ref,
) {
  const stepper = useStepperContext()

  return (
    <div
      {...props}
      ref={ref}
      hidden={stepper.current !== value}
      className={classNames('frontier-stepper__panel', className)}
    />
  )
})
