'use client'

import { Pager } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import { getNeighbours } from '#/docs/navigation.js'

/** Links to the pages before and after the current one. */
export function DocsPager({
  path,
  readingOrder,
}: {
  path: string
  readingOrder: { label: string; href: string }[]
}): ReactElement | null {
  const { previous, next } = getNeighbours(readingOrder, path)

  if (!previous && !next) {
    return null
  }

  return <Pager className="docs-pager" previous={previous} next={next} label="Page navigation" />
}
