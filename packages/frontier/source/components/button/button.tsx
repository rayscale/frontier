import { motion, useReducedMotion } from 'motion/react'
import {
  Children,
  type ElementType,
  isValidElement,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react'

import { springInteractive } from '../../styles/motion.js'

import { getMotionComponent } from './helpers/motion.js'
import type { TButtonProps } from './types.js'

import './button.css'

export type { TButtonProps, TButtonSize, TButtonVariant } from './types.js'

/**
 * Renders a native button with optional hover and press animations. Respects
 * reduced-motion preferences and defaults `type` to `button`.
 */
export function Button({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  asChild = false,
  className,
  children,
  whileHover,
  whileTap,
  transition,
  type = 'button',
  ...props
}: TButtonProps): ReactElement {
  const reduceMotion = useReducedMotion()
  const motionDisabled = disabled || reduceMotion

  const classes = [
    'frontier-button',
    `frontier-button--${variant}`,
    `frontier-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (asChild && isValidElement(children)) {
    const child = Children.only(children) as ReactElement<{ [key: string]: unknown }>
    const MotionComponent = getMotionComponent(child.type as ElementType)
    const childProps = child.props

    const mergedClassName = [classes, childProps.className as string | undefined]
      .filter(Boolean)
      .join(' ')

    const handleChildClick = childProps.onClick as ((event: MouseEvent) => void) | undefined
    const handlePropsClick = (props as { onClick?: (event: MouseEvent) => void }).onClick

    const motionAndHtmlProps = { ...props }
    delete motionAndHtmlProps.variant
    delete motionAndHtmlProps.size
    delete motionAndHtmlProps.asChild
    delete motionAndHtmlProps.disabled
    delete motionAndHtmlProps.type
    delete motionAndHtmlProps.children
    delete motionAndHtmlProps.className

    const Component = MotionComponent

    return (
      <Component
        {...motionAndHtmlProps}
        {...childProps}
        aria-disabled={disabled ? true : (childProps['aria-disabled'] as boolean | undefined)}
        className={mergedClassName}
        whileHover={motionDisabled ? undefined : (whileHover ?? { scale: 1.03 })}
        whileTap={motionDisabled ? undefined : (whileTap ?? { scale: 0.97 })}
        transition={transition ?? springInteractive}
        onClick={(event: MouseEvent) => {
          handleChildClick?.(event)
          handlePropsClick?.(event)
        }}
      >
        <span className="frontier-button__content">{childProps.children as ReactNode}</span>
      </Component>
    )
  }

  return (
    <motion.button
      {...props}
      type={type}
      disabled={disabled}
      className={classes}
      {...(motionDisabled
        ? {}
        : { whileHover: whileHover ?? { scale: 1.03 }, whileTap: whileTap ?? { scale: 0.97 } })}
      transition={transition ?? springInteractive}
    >
      <span className="frontier-button__content">{children}</span>
    </motion.button>
  )
}
