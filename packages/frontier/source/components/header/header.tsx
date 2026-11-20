import { forwardRef, useCallback, useRef } from 'react'

import { useDynamicHeaderState } from './hooks/use-dynamic-header-state.js'
import type { THeaderProps } from './types.js'

import './header.css'

export type { THeaderMode, THeaderProps } from './types.js'

/**
 * Renders a page header. `normal` stays in the flow, `fixed` sticks to the
 * top of its scroll container, and `dynamic` changes its presentation with
 * scroll direction. TLayout and content come entirely from children.
 */
export const Header = forwardRef<HTMLElement, THeaderProps>(function Header(
  { mode = 'normal', children, className, ...props },
  ref,
) {
  const elementRef = useRef<HTMLElement | null>(null)
  const state = useDynamicHeaderState(elementRef, mode === 'dynamic')

  const setElement = useCallback(
    (node: HTMLElement | null) => {
      elementRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [ref],
  )

  const dynamicState = mode === 'dynamic'
  const hiddenState = dynamicState && state === 'hidden'
  const classes = [
    'frontier-header',
    `frontier-header--${mode}`,
    dynamicState && `frontier-header--${state}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header
      ref={setElement}
      className={classes}
      data-mode={mode}
      data-state={dynamicState ? state : undefined}
      inert={hiddenState}
      {...props}
    >
      {children}
    </header>
  )
})
