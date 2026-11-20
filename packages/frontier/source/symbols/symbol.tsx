import { createElement, forwardRef } from 'react'

import { classNames } from '../internal/helpers/class-names.js'

import type { TSymbolProps } from './types.js'

import './symbol.css'

export const Symbol = forwardRef<SVGSVGElement, TSymbolProps>(function Symbol(props, ref) {
  const { className, symbolNode, size = 24, ...rest } = props

  return (
    <svg
      {...rest}
      ref={ref}
      aria-hidden="true"
      className={classNames('frontier-symbol', className)}
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
      {symbolNode.map(([tag, attributes], index) =>
        createElement(tag, { ...attributes, key: index }),
      )}
    </svg>
  )
})
