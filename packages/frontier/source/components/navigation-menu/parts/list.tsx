import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu'
import { forwardRef, useId } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import type { TNavigationMenuItemProps, TNavigationMenuListProps } from '../types.js'

export const NavigationMenuList = forwardRef<HTMLUListElement, TNavigationMenuListProps>(
  function NavigationMenuList({ className, ...props }, ref) {
    return (
      <BaseNavigationMenu.List
        {...props}
        ref={ref}
        className={classNames('frontier-navigation-menu__list', className)}
      />
    )
  },
)

export const NavigationMenuItem = forwardRef<HTMLLIElement, TNavigationMenuItemProps>(
  function NavigationMenuItem({ value, className, ...props }, ref) {
    const generatedValue = useId()
    const itemValue = value ?? generatedValue

    return (
      <BaseNavigationMenu.Item
        {...props}
        ref={ref}
        value={itemValue}
        className={classNames('frontier-navigation-menu__item', className)}
      />
    )
  },
)
