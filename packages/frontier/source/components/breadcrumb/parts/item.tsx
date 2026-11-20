import type { ReactElement } from 'react'

import type { TBreadcrumbItemProps } from '../types.js'

export function BreadcrumbItem({ href, current, children }: TBreadcrumbItemProps): ReactElement {
  if (current) {
    return (
      <span className="frontier-breadcrumb__current" aria-current="page">
        {children}
      </span>
    )
  }

  if (href === undefined) {
    return <span className="frontier-breadcrumb__text">{children}</span>
  }

  return (
    <a className="frontier-breadcrumb__link" href={href}>
      {children}
    </a>
  )
}
