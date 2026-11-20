import { type ElementType, forwardRef } from 'react'

import type {
  TCardContentProps,
  TCardDescriptionProps,
  TCardFooterProps,
  TCardHeaderProps,
  TCardProps,
  TCardTitleProps,
} from '../types.js'

export const CardRoot = forwardRef<HTMLElement, TCardProps>(function CardRoot(
  { as: Element = 'div', children, className, padding = 'default', ...props },
  ref,
) {
  const Component = Element as ElementType
  const classes = ['frontier-card', padding === 'none' && 'frontier-card--padding-none', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Component ref={ref} className={classes} {...props}>
      {children}
    </Component>
  )
})

export const CardHeader = forwardRef<HTMLDivElement, TCardHeaderProps>(function CardHeader(
  { children, className, ...props },
  ref,
) {
  const classes = ['frontier-card__header', className].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  )
})

export const CardTitle = forwardRef<HTMLElement, TCardTitleProps>(function CardTitle(
  { as: Element = 'h3', children, className, ...props },
  ref,
) {
  const Component = Element as ElementType
  const classes = ['frontier-card__title', className].filter(Boolean).join(' ')

  return (
    <Component ref={ref} className={classes} {...props}>
      {children}
    </Component>
  )
})

export const CardDescription = forwardRef<HTMLElement, TCardDescriptionProps>(
  function CardDescription({ as: Element = 'p', children, className, ...props }, ref) {
    const Component = Element as ElementType
    const classes = ['frontier-card__description', className].filter(Boolean).join(' ')

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    )
  },
)

export const CardContent = forwardRef<HTMLDivElement, TCardContentProps>(function CardContent(
  { children, className, ...props },
  ref,
) {
  const classes = ['frontier-card__content', className].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  )
})

export const CardFooter = forwardRef<HTMLDivElement, TCardFooterProps>(function CardFooter(
  { children, className, ...props },
  ref,
) {
  const classes = ['frontier-card__footer', className].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  )
})
