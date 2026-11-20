import { Breadcrumb } from '@rayscale/frontier'
import type { ReactElement } from 'react'
import { useLocation } from 'react-router'

import { getBreadcrumbs } from '#/docs/navigation.js'
import { pages } from '#/docs/pages.js'

/** Where the current page sits in the documentation. */
export function DocsBreadcrumbs(): ReactElement {
  const { pathname } = useLocation()
  const trail = getBreadcrumbs(pages, pathname.replace(/\/+$/, '') || '/docs')

  return (
    <Breadcrumb aria-label="Breadcrumb" maxVisibleItems={4}>
      {trail.map((crumb, index) => (
        <Breadcrumb.Item
          key={crumb.href}
          href={index === trail.length - 1 ? undefined : crumb.href}
          current={index === trail.length - 1}
        >
          {crumb.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}
