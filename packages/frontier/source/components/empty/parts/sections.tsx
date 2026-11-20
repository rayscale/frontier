import { type ElementType, forwardRef } from 'react'

import type {
  TEmptyContentProps,
  TEmptyDescriptionProps,
  TEmptyHeaderProps,
  TEmptyMediaProps,
  TEmptyRootProps,
  TEmptyTitleProps,
} from '../types.js'

export const EmptyRoot = forwardRef<HTMLDivElement, TEmptyRootProps>(function EmptyRoot(
  { children, className, variant = 'default', size = 'default', ...props },
  ref,
) {
  const classes = [
    'frontier-empty',
    variant !== 'default' && `frontier-empty--${variant}`,
    size !== 'default' && `frontier-empty--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  )
})

export const EmptyHeader = forwardRef<HTMLDivElement, TEmptyHeaderProps>(function EmptyHeader(
  { children, className, ...props },
  ref,
) {
  const classes = ['frontier-empty__header', className].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  )
})

export const EmptyMedia = forwardRef<HTMLDivElement, TEmptyMediaProps>(function EmptyMedia(
  { children, className, variant = 'default', ...props },
  ref,
) {
  const classes = [
    'frontier-empty__media',
    variant === 'symbol' && 'frontier-empty__media--symbol',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  )
})

export const EmptyTitle = forwardRef<HTMLElement, TEmptyTitleProps>(function EmptyTitle(
  { as: Element = 'h3', children, className, ...props },
  ref,
) {
  const Component = Element as ElementType
  const classes = ['frontier-empty__title', className].filter(Boolean).join(' ')

  return (
    <Component ref={ref} className={classes} {...props}>
      {children}
    </Component>
  )
})

export const EmptyDescription = forwardRef<HTMLElement, TEmptyDescriptionProps>(
  function EmptyDescription({ as: Element = 'p', children, className, ...props }, ref) {
    const Component = Element as ElementType
    const classes = ['frontier-empty__description', className].filter(Boolean).join(' ')

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    )
  },
)

export const EmptyContent = forwardRef<HTMLDivElement, TEmptyContentProps>(function EmptyContent(
  { children, className, ...props },
  ref,
) {
  const classes = ['frontier-empty__content', className].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  )
})
