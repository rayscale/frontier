import { symbolMetadata, symbolMetadataByName } from '@rayscale/frontier/symbol-metadata'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactElement } from 'react'

import { SymbolPage } from '#/components/docs/symbol-page.js'

interface TProps {
  params: Promise<{ name: string }>
}

// Only the symbols of the package exist; every other name is a 404.
export const dynamicParams = false

/** One static page per symbol of the package. */
export function generateStaticParams(): { name: string }[] {
  return symbolMetadata.map(({ name }) => ({ name }))
}

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const { name } = await params
  const metadata = symbolMetadataByName[name]

  if (!metadata) {
    return {}
  }

  return { title: metadata.component, description: metadata.description }
}

export default async function Page({ params }: TProps): Promise<ReactElement> {
  const { name } = await params
  const metadata = symbolMetadataByName[name]

  if (!metadata) {
    notFound()
  }

  return <SymbolPage name={name} />
}
