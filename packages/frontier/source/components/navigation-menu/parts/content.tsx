import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu'
import { forwardRef } from 'react'

import { ChevronDown } from '../../../icons/index.js'
import { classNames } from '../../../internal/helpers/class-names.js'
import type {
  TNavigationMenuContentProps,
  TNavigationMenuGroupProps,
  TNavigationMenuTriggerProps,
} from '../types.js'

export const NavigationMenuTrigger = forwardRef<HTMLButtonElement, TNavigationMenuTriggerProps>(
  function NavigationMenuTrigger({ className, children, ...props }, ref) {
    return (
      <BaseNavigationMenu.Trigger
        {...props}
        ref={ref}
        className={classNames('frontier-navigation-menu__trigger', className)}
      >
        {children}
        <ChevronDown
          className="frontier-navigation-menu__trigger-icon"
          aria-hidden="true"
          focusable="false"
          size={16}
        />
      </BaseNavigationMenu.Trigger>
    )
  },
)

export const NavigationMenuContent = forwardRef<HTMLDivElement, TNavigationMenuContentProps>(
  function NavigationMenuContent({ className, children, ...props }, ref) {
    return (
      <BaseNavigationMenu.Content
        {...props}
        ref={ref}
        className={classNames('frontier-navigation-menu__content', className)}
      >
        {children}
      </BaseNavigationMenu.Content>
    )
  },
)

export const NavigationMenuGroup = forwardRef<HTMLDivElement, TNavigationMenuGroupProps>(
  function NavigationMenuGroup({ className, children, ...props }, ref) {
    return (
      <div
        {...props}
        ref={ref}
        role="group"
        className={classNames('frontier-navigation-menu__group', className)}
      >
        {children}
      </div>
    )
  },
)
