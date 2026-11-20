import type { CSSProperties, ReactElement } from 'react'

import type { TCssCustomProperties } from '../../internal/helpers/css-custom-properties.js'
import { resolveRadius } from '../../internal/helpers/resolve-radius.js'

import {
  isProgressSize,
  resolveColor,
  resolveDiameter,
  resolveMax,
  resolveThickness,
  resolveTrackColor,
  resolveValue,
} from './helpers/resolve.js'
import { CircularIndicator } from './parts/circular-indicator.js'
import type { TProgressProps } from './types.js'

import './progress.css'

export type {
  TProgressAnimation,
  TProgressCircularProps,
  TProgressColor,
  TProgressLinearProps,
  TProgressProps,
  TProgressRadiusToken,
  TProgressSize,
  TProgressTrackColor,
  TProgressVariant,
} from './types.js'

/**
 * Renders a progress indicator as a linear bar (the default) or a circular
 * ring. Omit `value` for indeterminate progress, which shows ongoing activity
 * without exposing a completion value to assistive technology. Both variants
 * share the same progress semantics and ARIA attributes.
 */
export function Progress({
  animation = 'smooth',
  className,
  color,
  max,
  radius,
  size = 'medium',
  style,
  thickness,
  trackColor,
  value,
  variant = 'linear',
  ...props
}: TProgressProps): ReactElement {
  const effectiveMax = resolveMax(max)
  const effectiveValue = resolveValue(value, effectiveMax)
  const indeterminateState = effectiveValue === undefined
  const circularState = variant === 'circular'
  const percentage =
    effectiveValue === undefined ? undefined : (effectiveValue / effectiveMax) * 100

  const inlineStyle: CSSProperties & TCssCustomProperties = { ...style }
  const resolvedRadius = circularState ? undefined : resolveRadius(radius)
  if (resolvedRadius !== undefined) {
    inlineStyle.borderRadius = resolvedRadius
  }

  const resolvedDiameter = circularState ? resolveDiameter(size) : undefined
  if (resolvedDiameter !== undefined) {
    inlineStyle['--_progress-diameter'] = resolvedDiameter
  }

  const resolvedThickness = resolveThickness(thickness)
  if (resolvedThickness !== undefined) {
    inlineStyle['--_progress-thickness'] = resolvedThickness
  }

  const resolvedColor = resolveColor(color)
  if (resolvedColor !== undefined) {
    inlineStyle['--_progress-color'] = resolvedColor
  }

  const resolvedTrackColor = resolveTrackColor(trackColor)
  if (resolvedTrackColor !== undefined) {
    inlineStyle['--_progress-track-color'] = resolvedTrackColor
  }

  if (percentage !== undefined) {
    inlineStyle['--_progress-value'] = `${String(percentage)}%`
  }

  const classes = [
    'frontier-progress',
    circularState ? 'frontier-progress--circular' : 'frontier-progress--linear',
    isProgressSize(size) && `frontier-progress--${size}`,
    `frontier-progress--${animation}`,
    indeterminateState && 'frontier-progress--indeterminate',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      {...props}
      className={classes}
      style={inlineStyle}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={effectiveMax}
      aria-valuenow={effectiveValue}
    >
      {circularState ? (
        <CircularIndicator percentage={percentage} />
      ) : (
        <div className="frontier-progress__indicator" />
      )}
    </div>
  )
}
