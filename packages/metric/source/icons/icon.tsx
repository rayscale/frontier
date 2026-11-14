import { createElement, forwardRef } from 'react'

import type { TIconProps } from './types.js'

import './icon.css'

export const Icon = forwardRef<SVGSVGElement, TIconProps>(function Icon(props, ref) {
  const { className, iconNode, size = 'inline', ...rest } = props
  const classes = ['metric-icon', `metric-icon--${size}`, className].filter(Boolean).join(' ')

  return (
    <svg
      {...rest}
      ref={ref}
      aria-hidden="true"
      className={classes}
      fill="none"
      focusable="false"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {iconNode.map(([tag, attributes], index) =>
        createElement(tag, { ...attributes, key: index }),
      )}
    </svg>
  )
})
