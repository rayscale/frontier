import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu'
import { forwardRef, useState } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { navigationMenuContext } from '../context.js'
import type { TNavigationMenuProps } from '../types.js'

import { StackedRoot } from './stacked.js'

export const NavigationMenuRoot = forwardRef<HTMLElement, TNavigationMenuProps>(
  function NavigationMenuRoot(
    {
      value,
      defaultValue,
      onValueChange,
      delay,
      closeDelay,
      layout = 'inline',
      revealed,
      className,
      children,
      ...props
    },
    ref,
  ) {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? null)
    const openValue = value !== undefined ? value : uncontrolledValue

    const handleValueChange = (nextValue: string | null): void => {
      if (value === undefined) {
        setUncontrolledValue(nextValue)
      }

      onValueChange?.(nextValue)
    }

    if (layout === 'stacked') {
      return (
        <navigationMenuContext.Provider
          value={{ layout, value: openValue, setValue: handleValueChange }}
        >
          <StackedRoot {...props} ref={ref} className={className} revealed={revealed}>
            {children}
          </StackedRoot>
        </navigationMenuContext.Provider>
      )
    }

    return (
      <BaseNavigationMenu.Root
        {...props}
        ref={ref}
        value={openValue}
        onValueChange={handleValueChange}
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
