import { type ComponentType, lazy, type LazyExoticComponent } from 'react'

import type { TExampleProps } from './types.js'

/** The live example of each pair, by the name that a guideline gives it. */
export const examples: ReadonlyMap<
  string,
  LazyExoticComponent<ComponentType<TExampleProps>>
> = new Map([
  ['colors-primary-role', lazy(() => import('./examples/colors-primary-role.js'))],
  ['colors-status-alone', lazy(() => import('./examples/colors-status-alone.js'))],
  ['colors-status-contrast', lazy(() => import('./examples/colors-status-contrast.js'))],
  ['forms-error-placement', lazy(() => import('./examples/forms-error-placement.js'))],
  ['forms-label', lazy(() => import('./examples/forms-label.js'))],
  ['forms-validation-timing', lazy(() => import('./examples/forms-validation-timing.js'))],
  ['hierarchy-alignment', lazy(() => import('./examples/hierarchy-alignment.js'))],
  ['hierarchy-current', lazy(() => import('./examples/hierarchy-current.js'))],
  ['hierarchy-depth', lazy(() => import('./examples/hierarchy-depth.js'))],
  ['hierarchy-disclosure', lazy(() => import('./examples/hierarchy-disclosure.js'))],
  ['motion-exit', lazy(() => import('./examples/motion-exit.js'))],
  ['motion-first-frame', lazy(() => import('./examples/motion-first-frame.js'))],
  ['motion-purpose', lazy(() => import('./examples/motion-purpose.js'))],
  ['shape-full-rounding', lazy(() => import('./examples/shape-full-rounding.js'))],
  ['shape-nested-radius', lazy(() => import('./examples/shape-nested-radius.js'))],
  ['typeface-case', lazy(() => import('./examples/typeface-case.js'))],
  ['typeface-emphasis', lazy(() => import('./examples/typeface-emphasis.js'))],
  ['writing-action', lazy(() => import('./examples/writing-action.js'))],
  ['writing-confirmation', lazy(() => import('./examples/writing-confirmation.js'))],
  ['writing-empty', lazy(() => import('./examples/writing-empty.js'))],
  ['writing-error', lazy(() => import('./examples/writing-error.js'))],
  ['writing-label', lazy(() => import('./examples/writing-label.js'))],
])

/** Examples that show a movement, so people can play them. The others are only illustrations. */
export const interactiveExamples: ReadonlySet<string> = new Set([
  'hierarchy-current',
  'motion-exit',
  'motion-first-frame',
  'motion-purpose',
])
