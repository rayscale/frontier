import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu'
import { forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { useNavigationMenuContext } from '../context.js'
import type { TNavigationMenuLinkProps } from '../types.js'

import { StackedLink } from './stacked.js'

export const NavigationMenuLink = forwardRef<HTMLAnchorElement, TNavigationMenuLinkProps>(
  function NavigationMenuLink({ active, closeOnClick, className, ...props }, ref) {
    const { layout } = useNavigationMenuContext()

    if (layout === 'stacked') {
      return (
        <StackedLink
          {...props}
          ref={ref}
          active={active}
          closeOnClick={closeOnClick}
          className={className}
        />
      )
    }

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
