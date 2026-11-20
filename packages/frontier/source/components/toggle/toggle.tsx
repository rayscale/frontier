import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import { motion, useReducedMotion } from 'motion/react'
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react'

import { springInteractive } from '../../styles/motion.js'

import './toggle.css'

/** Visual appearance of a toggle. */
export type TToggleVariant = 'default' | 'outline'

/** Available toggle sizes. */
export type TToggleSize = 'small' | 'medium' | 'large'

/** Props for an independent two-state toggle button. */
export type TToggleProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-pressed' | 'value'
> & {
  /** Content of the toggle. Icon-only toggles need an accessible name. */
  children?: ReactNode | undefined
  /** Unique string value when the toggle is used within a toggle group. */
  value?: string | undefined
  /** Whether the toggle is pressed in controlled mode. */
  pressed?: boolean | undefined
  /** Initial pressed state in uncontrolled mode. Defaults to `false`. */
  defaultPressed?: boolean | undefined
  /** Called when the pressed state changes. */
  onPressedChange?: ((pressed: boolean) => void) | undefined
  /** Visual appearance. Defaults to `default`. */
  variant?: TToggleVariant | undefined
  /** Visual size. Defaults to `medium`. */
  size?: TToggleSize | undefined
}

/** Renders an independently controlled two-state button. */
export const Toggle = forwardRef<HTMLButtonElement, TToggleProps>(function Toggle(
  {
    className,
    defaultPressed,
    disabled,
    onPressedChange,
    pressed,
    size = 'medium',
    type = 'button',
    variant = 'default',
    ...props
  },
  ref,
) {
  const reduceMotion = useReducedMotion()
  const motionDisabled = disabled === true || reduceMotion

  return (
    <BaseToggle
      {...props}
      ref={ref}
      render={
        <motion.button
          {...(motionDisabled ? {} : { whileTap: { scale: 0.97 } })}
          transition={springInteractive}
        />
      }
      type={type}
      disabled={disabled}
      pressed={pressed}
      defaultPressed={defaultPressed}
      onPressedChange={(nextPressed) => onPressedChange?.(nextPressed)}
      className={[
        'frontier-toggle',
        `frontier-toggle--${variant}`,
        `frontier-toggle--${size}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
})
