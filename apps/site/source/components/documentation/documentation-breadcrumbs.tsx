'use client'

import { Breadcrumb } from '@rayscale/frontier'
import { usePathname } from 'next/navigation'
import type { ReactElement } from 'react'

import { getBreadcrumbs } from '#/documentation/navigation.js'

import { useDocumentationPages } from './documentation-provider.js'

/** Where the current page sits in the documentation. */
export function DocumentationBreadcrumbs(): ReactElement {
  const pathname = usePathname()
  const pages = useDocumentationPages()
  const trail = getBreadcrumbs([...pages], pathname.replace(/\/+$/, '') || '/documentation')

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
