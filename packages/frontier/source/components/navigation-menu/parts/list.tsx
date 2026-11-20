import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu'
import { forwardRef, useId } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { useNavigationMenuContext } from '../context.js'
import type { TNavigationMenuItemProps, TNavigationMenuListProps } from '../types.js'

import { StackedItem, StackedList } from './stacked.js'

export const NavigationMenuList = forwardRef<HTMLUListElement, TNavigationMenuListProps>(
  function NavigationMenuList({ className, ...props }, ref) {
    const { layout } = useNavigationMenuContext()

    if (layout === 'stacked') {
      return <StackedList {...props} ref={ref} className={className} />
    }

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
    const { layout } = useNavigationMenuContext()
    const generatedValue = useId()
    const itemValue = value ?? generatedValue

    if (layout === 'stacked') {
      return <StackedItem {...props} ref={ref} value={value} className={className} />
    }

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
