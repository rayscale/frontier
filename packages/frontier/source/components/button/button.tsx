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

import { classNames } from '../../internal/helpers/class-names.js'
import { Tooltip } from '../tooltip/index.js'

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
  const classes = classNames(
    'frontier-button',
    `frontier-button--${variant}`,
    iconOnly && 'frontier-button--icon',
    className,
  )
  const describedBy =
    [ariaDescribedBy, unavailable && disabledReason ? reasonId : undefined]
      .filter(Boolean)
      .join(' ') || undefined
  const reason =
    unavailable && disabledReason ? (
      <span className="frontier-button__reason" id={reasonId}>
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
    const mergedTitle = childTitle ?? title
    const mergedAriaLabel = childAriaLabel ?? ariaLabel

    const control = cloneElement(child, {
      ...rest,
      ...childProps,
      ref: mergeRefs(forwardedRef, child.ref),
      className: classNames(classes, childClassName),
      'aria-disabled': unavailable ? true : childProps['aria-disabled'],
      'aria-describedby': mergedDescribedBy,
      'aria-label': mergedAriaLabel,
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
        <span className="frontier-button__content">{childProps.children as ReactNode}</span>
      ),
    })

    return (
      <>
        {iconOnly && mergedAriaLabel ? (
          <Tooltip content={mergedAriaLabel}>{control}</Tooltip>
        ) : (
          control
        )}
        {reason}
      </>
    )
  }

  const control = (
    <button
      {...rest}
      ref={forwardedRef as Ref<HTMLButtonElement>}
      type={type}
      className={classes}
      aria-disabled={unavailable || undefined}
      aria-describedby={describedBy}
      aria-label={ariaLabel}
      data-pressed={keyPressed ? 'key' : undefined}
      title={title}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={handleBlur}
    >
      <span className="frontier-button__content">{children}</span>
    </button>
  )

  return (
    <>
      {iconOnly && ariaLabel ? <Tooltip content={ariaLabel}>{control}</Tooltip> : control}
      {reason}
    </>
  )
})
