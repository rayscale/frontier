import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu'
import { forwardRef, useState } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import type { TNavigationMenuProps } from '../types.js'

export const NavigationMenuRoot = forwardRef<HTMLElement, TNavigationMenuProps>(
  function NavigationMenuRoot(
    { value, defaultValue, onValueChange, delay, closeDelay, className, children, ...props },
    ref,
  ) {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? null)
    const openValue = value !== undefined ? value : uncontrolledValue

    return (
      <BaseNavigationMenu.Root
        {...props}
        ref={ref}
        value={openValue}
        onValueChange={(nextValue) => {
          if (value === undefined) {
            setUncontrolledValue(nextValue)
          }

          onValueChange?.(nextValue)
        }}
        delay={delay}
        closeDelay={closeDelay}
        className={classNames('frontier-navigation-menu', className)}
      >
        {children}
        <BaseNavigationMenu.Portal>
          <BaseNavigationMenu.Positioner
            className="frontier-navigation-menu__positioner"
            sideOffset={8}
            align="start"
          >
            <BaseNavigationMenu.Popup
              render={<div />}
              className="frontier-floating-surface frontier-navigation-menu__popup"
            >
              <BaseNavigationMenu.Viewport className="frontier-navigation-menu__viewport" />
            </BaseNavigationMenu.Popup>
          </BaseNavigationMenu.Positioner>
        </BaseNavigationMenu.Portal>
      </BaseNavigationMenu.Root>
    )
  },
)
