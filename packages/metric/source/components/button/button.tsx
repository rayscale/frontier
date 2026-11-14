import {
  cloneElement,
  type FocusEvent,
  forwardRef,
  Fragment,
  isValidElement,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
  useId,
  useState,
} from 'react'

import type { TButtonProps } from './types.js'

import './button.css'

function mergeRefs<TNode>(...refs: (Ref<TNode> | undefined)[]): Ref<TNode> {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref) {
        ref.current = value
      }
    }
  }
}

export const Button = forwardRef<HTMLElement, TButtonProps>(function Button(props, forwardedRef) {
  const {
    asChild = false,
    children,
    className,
    disabled = false,
    disabledReason,
    iconOnly = false,
    onBlur,
    onClick,
    onKeyDown,
    onKeyUp,
    title,
    type = 'button',
    variant = 'primary',
    'aria-describedby': ariaDescribedBy,
    'aria-label': ariaLabel,
    ...rest
  } = props

  const reasonId = useId()
  const [keyPressed, setKeyPressed] = useState(false)
  const unavailable = disabled
  const classes = [
    'metric-button',
    `metric-button--${variant}`,
    iconOnly ? 'metric-button--icon' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const describedBy =
    [ariaDescribedBy, unavailable && disabledReason ? reasonId : undefined]
      .filter(Boolean)
      .join(' ') || undefined
  const resolvedTitle = unavailable ? disabledReason : (title ?? (iconOnly ? ariaLabel : undefined))
  const reason =
    unavailable && disabledReason ? (
      <span className="metric-button__reason" id={reasonId}>
        {disabledReason}
      </span>
    ) : null

  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    if (unavailable) {
      event.preventDefault()
      event.stopPropagation()

      return
    }

    onClick?.(event)
  }

  const isPressKey = (event: KeyboardEvent<HTMLElement>): boolean =>
    event.key === 'Enter' || event.key === ' '

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    if (!unavailable && isPressKey(event)) {
      setKeyPressed(true)
    }

    onKeyDown?.(event)
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLElement>): void => {
    if (isPressKey(event)) {
      setKeyPressed(false)
    }

    onKeyUp?.(event)
  }

  const handleBlur = (event: FocusEvent<HTMLElement>): void => {
    setKeyPressed(false)
    onBlur?.(event)
  }

  if (asChild) {
    if (!isValidElement(children) || children.type === Fragment) {
      throw new Error('Button asChild requires a single React element as children.')
    }

    const child = children as ReactElement<{ [key: string]: unknown }> & {
      ref?: Ref<HTMLElement>
    }
    const childProps = child.props
    const childClassName =
      typeof childProps.className === 'string' ? childProps.className : undefined
    const childOnClick =
      typeof childProps.onClick === 'function'
        ? (childProps.onClick as (event: MouseEvent<HTMLElement>) => void)
        : undefined
    const childDescribedBy =
      typeof childProps['aria-describedby'] === 'string'
        ? childProps['aria-describedby']
        : undefined
    const childTitle = typeof childProps.title === 'string' ? childProps.title : undefined
    const childOnBlur =
      typeof childProps.onBlur === 'function'
        ? (childProps.onBlur as (event: FocusEvent<HTMLElement>) => void)
        : undefined
    const childOnKeyDown =
      typeof childProps.onKeyDown === 'function'
        ? (childProps.onKeyDown as (event: KeyboardEvent<HTMLElement>) => void)
        : undefined
    const childOnKeyUp =
      typeof childProps.onKeyUp === 'function'
        ? (childProps.onKeyUp as (event: KeyboardEvent<HTMLElement>) => void)
        : undefined
    const childAriaLabel =
      typeof childProps['aria-label'] === 'string' ? childProps['aria-label'] : undefined
    const mergedDescribedBy = [childDescribedBy, describedBy].filter(Boolean).join(' ') || undefined
    const mergedTitle = unavailable
      ? disabledReason
      : (childTitle ?? title ?? (iconOnly ? (childAriaLabel ?? ariaLabel) : undefined))

    return (
      <>
        {cloneElement(child, {
          ...rest,
          ...childProps,
          ref: mergeRefs(forwardedRef, child.ref),
          className: [classes, childClassName].filter(Boolean).join(' '),
          'aria-disabled': unavailable ? true : childProps['aria-disabled'],
          'aria-describedby': mergedDescribedBy,
          'aria-label': childAriaLabel ?? ariaLabel,
          'data-pressed': keyPressed ? 'key' : undefined,
          title: mergedTitle,
          onBlur: (event: FocusEvent<HTMLElement>) => {
            handleBlur(event)
            childOnBlur?.(event)
          },
          onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
            handleKeyDown(event)
            childOnKeyDown?.(event)
          },
          onKeyUp: (event: KeyboardEvent<HTMLElement>) => {
            handleKeyUp(event)
            childOnKeyUp?.(event)
          },
          onClick: (event: MouseEvent<HTMLElement>) => {
            if (unavailable) {
              event.preventDefault()
              event.stopPropagation()

              return
            }

            childOnClick?.(event)
            onClick?.(event)
          },
          children: (
            <span className="metric-button__content">{childProps.children as ReactNode}</span>
          ),
        })}
        {reason}
      </>
    )
  }

  return (
    <>
      <button
        {...rest}
        ref={forwardedRef as Ref<HTMLButtonElement>}
        type={type}
        className={classes}
        aria-disabled={unavailable || undefined}
        aria-describedby={describedBy}
        data-pressed={keyPressed ? 'key' : undefined}
        title={resolvedTitle}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
      >
        <span className="metric-button__content">{children}</span>
      </button>
      {reason}
    </>
  )
})
