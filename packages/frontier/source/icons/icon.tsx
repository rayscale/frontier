import { createElement, forwardRef } from 'react'

import { classNames } from '../internal/helpers/class-names.js'

import type { TIconProps } from './types.js'

import './icon.css'

export const Icon = forwardRef<SVGSVGElement, TIconProps>(function Icon(props, ref) {
  const { animate, className, iconNode, motion, size = 24, ...rest } = props

  return (
    <svg
      {...rest}
      ref={ref}
      aria-hidden="true"
      className={classNames('frontier-icon', className)}
      data-animate={animate === true ? '' : undefined}
      data-motion={motion}
      fill="none"
      focusable="false"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {iconNode.map(([tag, attributes], index) =>
        createElement(tag, {
          ...attributes,
          ...(motion === 'draw' ? { pathLength: 1 } : {}),
          key: index,
        }),
      )}
    </svg>
  )
})
