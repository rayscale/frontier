import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'

import { headerContext } from './context.js'
import { useDynamicHeaderState } from './hooks/use-dynamic-header-state.js'
import { HeaderNavigationMenu } from './parts/navigation-menu.js'
import type { THeaderProps } from './types.js'

import './header.css'

export type { THeaderMode, THeaderNavigationMenuProps, THeaderProps } from './types.js'

export interface THeaderComponent extends React.ForwardRefExoticComponent<
  THeaderProps & React.RefAttributes<HTMLElement>
> {
  /**
   * Navigation that shows its items inline and collapses into a menu button
   * and a vertical panel on compact screens. The panel extends the header, so
   * the header grows downward as one surface.
   */
  NavigationMenu: typeof HeaderNavigationMenu
}

const HeaderRoot = forwardRef<HTMLElement, THeaderProps>(function Header(
  { mode = 'normal', children, className, ...props },
  ref,
) {
  const elementRef = useRef<HTMLElement | null>(null)
  const [expanded, setExpanded] = useState(false)
  const state = useDynamicHeaderState(elementRef, mode === 'dynamic', expanded)

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

  const context = useMemo(
    () => ({ mode, expanded, headerRef: elementRef, setExpanded }),
    [mode, expanded],
  )
  const dynamicState = mode === 'dynamic'
  const hiddenState = dynamicState && state === 'hidden'
  const classes = [
    'frontier-header',
    `frontier-header--${mode}`,
    dynamicState && `frontier-header--${state}`,
    expanded && 'frontier-header--expanded',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <headerContext.Provider value={context}>
      <header
        ref={setElement}
        className={classes}
        data-mode={mode}
        data-state={dynamicState ? state : undefined}
        data-expanded={expanded ? '' : undefined}
        inert={hiddenState}
        {...props}
      >
        {children}
      </header>
    </headerContext.Provider>
  )
})

/**
 * Renders a page header. `normal` stays in the flow, `fixed` sticks to the
 * top of its scroll container, and `dynamic` stays pinned and changes its presentation with
 * scroll direction. Layout and content come entirely from children. Use
 * `Header.NavigationMenu` for navigation that adapts to compact screens.
 */
export const Header: THeaderComponent = Object.assign(HeaderRoot, {
  NavigationMenu: HeaderNavigationMenu,
})
