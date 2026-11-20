import { type ElementType, forwardRef } from 'react'

import type {
  TFooterBottomProps,
  TFooterBrandProps,
  TFooterContentProps,
  TFooterHeadingProps,
  TFooterProps,
  TFooterSectionProps,
} from '../types.js'

export const FooterRoot = forwardRef<HTMLElement, TFooterProps>(function FooterRoot(
  { children, className, transparent = false, ...props },
  ref,
) {
  const classes = ['frontier-footer', transparent && 'frontier-footer--transparent', className]
    .filter(Boolean)
    .join(' ')

  return (
    <footer ref={ref} className={classes} {...props}>
      {children}
    </footer>
  )
})

export const FooterContent = forwardRef<HTMLDivElement, TFooterContentProps>(function FooterContent(
  { children, className, ...props },
  ref,
) {
  const classes = ['frontier-footer__content', className].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  )
})

export const FooterBrand = forwardRef<HTMLDivElement, TFooterBrandProps>(function FooterBrand(
  { children, className, ...props },
  ref,
) {
  const classes = ['frontier-footer__brand', className].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  )
})

export const FooterSection = forwardRef<HTMLDivElement, TFooterSectionProps>(function FooterSection(
  { children, className, ...props },
  ref,
) {
  const classes = ['frontier-footer__section', className].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  )
})

export const FooterHeading = forwardRef<HTMLElement, TFooterHeadingProps>(function FooterHeading(
  { as: Element = 'h2', children, className, ...props },
  ref,
) {
  const Component = Element as ElementType
  const classes = ['frontier-footer__heading', className].filter(Boolean).join(' ')

  return (
    <Component ref={ref} className={classes} {...props}>
      {children}
    </Component>
  )
})

export const FooterBottom = forwardRef<HTMLDivElement, TFooterBottomProps>(function FooterBottom(
  { children, className, ...props },
  ref,
) {
  const classes = ['frontier-footer__bottom', className].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  )
})
