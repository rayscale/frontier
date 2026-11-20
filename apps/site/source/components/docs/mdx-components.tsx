import { Link } from '@rayscale/frontier'
import type { MDXComponents } from 'mdx/types'
import { type ComponentPropsWithoutRef, lazy } from 'react'

import { Demo } from './demo.js'
import { DocsCallout } from './docs-callout.js'
import { DocsPre } from './docs-code-block.js'
import { createHeading } from './docs-heading.js'
import { tableComponents } from './docs-table.js'
import { PackageManagerTabs } from './package-manager-tabs.js'
import { PageList } from './page-list.js'

const SymbolGallery = lazy(() => import('./symbol-gallery.js'))

/** The elements and components that every documentation page can use without importing them. */
export const mdxComponents: MDXComponents = {
  ...tableComponents,
  a: (props: ComponentPropsWithoutRef<'a'>) => <Link {...props} />,
  h2: createHeading('h2'),
  h3: createHeading('h3'),
  h4: createHeading('h4'),
  pre: DocsPre,
  Callout: DocsCallout,
  Demo,
  PackageManagerTabs,
  PageList,
  SymbolGallery,
}
