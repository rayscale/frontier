import type { MDXComponents } from 'mdx/types'

import { DoDont } from '#/components/guideline-examples/index.js'
import type { TDocumentationPage } from '#/documentation/types.js'

import { Demo } from './demo.js'
import { DocumentationCallout } from './documentation-callout.js'
import { DocumentationPre } from './documentation-code-block.js'
import { createHeading } from './documentation-heading.js'
import { DocumentationLink } from './documentation-link.js'
import {
  DocumentationTable,
  DocumentationTableBody,
  DocumentationTableCell,
  DocumentationTableHead,
  DocumentationTableHeader,
  DocumentationTableRow,
} from './documentation-table.js'
import IconGallery from './icon-gallery.js'
import { PackageManagerTabs } from './package-manager-tabs.js'
import { PageList } from './page-list.js'

/** The elements and components that a page can use without importing them. */
export function createMdxComponents(
  page: TDocumentationPage,
  pages: readonly TDocumentationPage[],
): MDXComponents {
  return {
    table: DocumentationTable,
    thead: DocumentationTableHeader,
    tbody: DocumentationTableBody,
    tr: DocumentationTableRow,
    th: DocumentationTableHead,
    td: DocumentationTableCell,
    a: DocumentationLink,
    h2: createHeading('h2'),
    h3: createHeading('h3'),
    h4: createHeading('h4'),
    pre: DocumentationPre,
    Callout: DocumentationCallout,
    Demo: ({ name }: { name: string }) => <Demo page={page} name={name} />,
    PackageManagerTabs,
    PageList: () => <PageList current={page} pages={pages} />,
    IconGallery,
    DoDont,
  }
}
