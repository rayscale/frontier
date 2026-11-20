import { type ElementType, forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import type {
  TCalloutActionsProps,
  TCalloutContentProps,
  TCalloutIconProps,
  TCalloutProps,
  TCalloutTitleProps,
} from '../types.js'

export const CalloutRoot = forwardRef<HTMLDivElement, TCalloutProps>(function CalloutRoot(
  { children, className, role = 'note', tone = 'info', ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role={role}
      data-tone={tone}
      className={classNames('frontier-callout', className)}
      {...props}
    >
      {children}
    </div>
  )
})

export const CalloutIcon = forwardRef<HTMLSpanElement, TCalloutIconProps>(function CalloutIcon(
  { children, className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={classNames('frontier-callout__icon', className)}
      {...props}
    >
      {children}
    </span>
  )
})

export const CalloutContent = forwardRef<HTMLDivElement, TCalloutContentProps>(
  function CalloutContent({ children, className, ...props }, ref) {
    return (
      <div ref={ref} className={classNames('frontier-callout__content', className)} {...props}>
        {children}
      </div>
    )
  },
)

export const CalloutTitle = forwardRef<HTMLElement, TCalloutTitleProps>(function CalloutTitle(
  { as: Element = 'p', children, className, ...props },
  ref,
) {
  const Component = Element as ElementType

  return (
    <Component ref={ref} className={classNames('frontier-callout__title', className)} {...props}>
      {children}
    </Component>
  )
})

export const CalloutActions = forwardRef<HTMLDivElement, TCalloutActionsProps>(
  function CalloutActions({ children, className, ...props }, ref) {
    return (
      <div ref={ref} className={classNames('frontier-callout__actions', className)} {...props}>
        {children}
      </div>
    )
  },
)
