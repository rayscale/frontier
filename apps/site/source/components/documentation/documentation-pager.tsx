'use client'

import { Pager } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import { getNeighbours } from '#/documentation/navigation.js'

/** Links to the pages before and after the current one. */
export function DocumentationPager({
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

  return (
    <Pager
      className="documentation-pager"
      previous={previous}
      next={next}
      label="Page navigation"
    />
  )
}
