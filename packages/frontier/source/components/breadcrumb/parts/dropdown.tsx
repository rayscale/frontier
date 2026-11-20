import type { ReactElement, ReactNode } from 'react'

import { MenuItem } from '../../../internal/primitives/menu/menu.js'
import { ChevronDown } from '../../../symbols/index.js'
import { DropdownMenu } from '../../dropdown-menu/dropdown-menu.js'
import type { TBreadcrumbDropdownProps } from '../types.js'

export function BreadcrumbMenuLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}): ReactElement {
  return (
    <MenuItem render={<a href={href} />} className="frontier-breadcrumb__menu-link">
      {children}
    </MenuItem>
  )
}

export function BreadcrumbDropdown({ label, items }: TBreadcrumbDropdownProps): ReactElement {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button type="button" className="frontier-breadcrumb__trigger">
          {label}
          <ChevronDown size={14} aria-hidden="true" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="start">
        {items.map((item) => (
          <BreadcrumbMenuLink key={item.href} href={item.href}>
            {item.label}
          </BreadcrumbMenuLink>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
