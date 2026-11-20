import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu'
import { forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import type { TNavigationMenuLinkProps } from '../types.js'

export const NavigationMenuLink = forwardRef<HTMLAnchorElement, TNavigationMenuLinkProps>(
  function NavigationMenuLink({ active, closeOnClick, className, ...props }, ref) {
    return (
      <BaseNavigationMenu.Link
        {...props}
        ref={ref}
        active={active}
        closeOnClick={closeOnClick}
        className={classNames('frontier-navigation-menu__link', className)}
      />
    )
  },
)
