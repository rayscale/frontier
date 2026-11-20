/**
 * Motion tokens for use with Motion's JavaScript/TypeScript API.
 *
 * Internal module: it is not exported from the package entry point.
 *
 * These values mirror the CSS custom properties defined in
 * `tokens/motion.css`. Because CSS custom properties cannot be passed
 * directly into Motion's `Transition` option, they are maintained here as
 * typed constants that must be kept in sync with the CSS file. CSS-only
 * tokens, such as `--frontier-duration-medium`, are not mirrored here.
 *
 * Durations are expressed in seconds, as required by Motion.
 * The corresponding CSS properties use milliseconds.
 */

/** 0.14 s. Equivalent to `--frontier-duration-fast`. */
export const durationFast = 0.14 as const

/** 0.16 s. Equivalent to `--frontier-duration-base`. */
export const durationBase = 0.16 as const

/** 0.8 s. Equivalent to `--frontier-duration-slow`. */
export const durationSlow = 0.8 as const

/**
 * Standard CSS `ease` expressed as a cubic-bezier for Motion.
 * Equivalent to `--frontier-easing-standard`.
 */
export const easingStandard = [0.25, 0.1, 0.25, 1] as const

/**
 * Ease-out cubic-bezier. Equivalent to `--frontier-easing-spring`.
 */
export const easingSpring = [0.2, 0.8, 0.2, 1] as const

/**
 * Press / hover scale spring for interactive elements (Button).
 * stiffness: 400, damping: 25.
 */
export const springInteractive = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
} as const

/**
 * TLayout transition spring for sliding indicators (SegmentedControl and Tabs).
 * stiffness: 450, damping: 35.
 */
export const springLayout = {
  type: 'spring',
  stiffness: 450,
  damping: 35,
} as const

/**
 * Travel spring for the shared hover highlight (Select, Combobox).
 * stiffness: 500, damping: 46. Slightly over-damped, so the highlight
 * settles without overshooting between options.
 */
export const springHighlight = {
  type: 'spring',
  stiffness: 500,
  damping: 46,
} as const
