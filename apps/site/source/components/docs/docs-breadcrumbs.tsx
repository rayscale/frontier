'use client'

import { Breadcrumb } from '@rayscale/frontier'
import { usePathname } from 'next/navigation'
import type { ReactElement } from 'react'

import { getBreadcrumbs } from '#/docs/navigation.js'

import { useDocsPages } from './docs-provider.js'

/** Where the current page sits in the documentation. */
export function DocsBreadcrumbs(): ReactElement {
  const pathname = usePathname()
  const pages = useDocsPages()
  const trail = getBreadcrumbs([...pages], pathname.replace(/\/+$/, '') || '/docs')

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
