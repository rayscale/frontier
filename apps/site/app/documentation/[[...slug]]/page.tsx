import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactElement } from 'react'

import { DocumentationPageFrame } from '#/components/documentation/documentation-page-frame.js'
import { DocumentationPageHeader } from '#/components/documentation/documentation-page-header.js'
import { DocumentationPager } from '#/components/documentation/documentation-pager.js'
import { createMdxComponents } from '#/components/documentation/mdx-components.js'
import { compilePage } from '#/documentation/compile.js'
import { findPage, loadDocumentation } from '#/documentation/pages.js'

interface TProps {
  params: Promise<{ slug?: string[] }>
}

// Only the pages found in the content folder exist; every other path is a 404.
export const dynamicParams = false

/** One static page per document in the content folder. */
export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const { pages } = await loadDocumentation()

  return pages.map((page) => ({ slug: page.path.split('/').slice(2) }))
}

async function resolvePage(params: TProps['params']) {
  const { slug = [] } = await params
  const documentation = await loadDocumentation()
  const page = findPage(documentation.pages, ['/documentation', ...slug].join('/'))

  if (!page) {
    notFound()
  }

  return { documentation, page }
}

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const { page } = await resolvePage(params)

  return { title: page.frontmatter.title, description: page.frontmatter.description }
}

export default async function Page({ params }: TProps): Promise<ReactElement> {
  const { documentation, page } = await resolvePage(params)
  const Content = await compilePage(page)

  return (
    <DocumentationPageFrame
      header={<DocumentationPageHeader page={page} />}
      pager={<DocumentationPager path={page.path} readingOrder={documentation.readingOrder} />}
    >
      <Content components={createMdxComponents(page, documentation.pages)} />
    </DocumentationPageFrame>
  )
}
