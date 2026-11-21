import type { MDXComponents } from 'mdx/types'

import { ThemePicker } from '#/components/theme/index.js'
import type { TDocsPage } from '#/docs/types.js'

import { Demo } from './demo.js'
import { DocsCallout } from './docs-callout.js'
import { DocsPre } from './docs-code-block.js'
import { createHeading } from './docs-heading.js'
import { DocsLink } from './docs-link.js'
import {
  DocsTable,
  DocsTableBody,
  DocsTableCell,
  DocsTableHead,
  DocsTableHeader,
  DocsTableRow,
} from './docs-table.js'
import { PackageManagerTabs } from './package-manager-tabs.js'
import { PageList } from './page-list.js'
import SymbolGallery from './symbol-gallery.js'
import ThemeGallery from './theme-gallery.js'
import { ThemePage } from './theme-page.js'

/** The elements and components that a page can use without importing them. */
export function createMdxComponents(page: TDocsPage, pages: readonly TDocsPage[]): MDXComponents {
  return {
    table: DocsTable,
    thead: DocsTableHeader,
    tbody: DocsTableBody,
    tr: DocsTableRow,
    th: DocsTableHead,
    td: DocsTableCell,
    a: DocsLink,
    h2: createHeading('h2'),
    h3: createHeading('h3'),
    h4: createHeading('h4'),
    pre: DocsPre,
    Callout: DocsCallout,
    Demo: ({ name }: { name: string }) => <Demo page={page} name={name} />,
    PackageManagerTabs,
    PageList: () => <PageList current={page} pages={pages} />,
    SymbolGallery,
    ThemeGallery,
    ThemePage,
    ThemePicker,
  }
}
