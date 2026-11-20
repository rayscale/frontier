import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactElement } from 'react'

import { DocsPageFrame } from '#/components/docs/docs-page-frame.js'
import { DocsPageHeader } from '#/components/docs/docs-page-header.js'
import { DocsPager } from '#/components/docs/docs-pager.js'
import { createMdxComponents } from '#/components/docs/mdx-components.js'
import { compilePage } from '#/docs/compile.js'
import { findPage, loadDocs } from '#/docs/pages.js'

interface TProps {
  params: Promise<{ slug?: string[] }>
}

// Only the pages found in the content folder exist; every other path is a 404.
export const dynamicParams = false

/** One static page per document in the content folder. */
export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const { pages } = await loadDocs()

  return pages.map((page) => ({ slug: page.path.split('/').slice(2) }))
}

async function resolvePage(params: TProps['params']) {
  const { slug = [] } = await params
  const docs = await loadDocs()
  const page = findPage(docs.pages, ['/docs', ...slug].join('/'))

  if (!page) {
    notFound()
  }

  return { docs, page }
}

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const { page } = await resolvePage(params)

  return { title: page.frontmatter.title, description: page.frontmatter.description }
}

export default async function Page({ params }: TProps): Promise<ReactElement> {
  const { docs, page } = await resolvePage(params)
  const Content = await compilePage(page)

  return (
    <DocsPageFrame
      header={<DocsPageHeader page={page} />}
      pager={<DocsPager path={page.path} readingOrder={docs.readingOrder} />}
    >
      <Content components={createMdxComponents(page, docs.pages)} />
    </DocsPageFrame>
  )
}
