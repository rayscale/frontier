import type { ReactElement } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { AnimatedHighlight } from '../../../internal/primitives/animated-highlight/animated-highlight.js'
import { usePaginationContext } from '../context.js'
import { getPaginationRange } from '../helpers/range.js'
import type { TPaginationItemsProps } from '../types.js'

import { PaginationControl } from './controls.js'

export function PaginationItems({ className, ...props }: TPaginationItemsProps): ReactElement {
  const { currentPage, pageCount, siblingCount, goToPage } = usePaginationContext('Items')
  const range = getPaginationRange(currentPage, pageCount, siblingCount)

  return (
    <div {...props} className={classNames('frontier-pagination__items', className)}>
      <AnimatedHighlight className="frontier-pagination__indicator" />
      {range.map((item) => {
        if (item.type === 'ellipsis') {
          return (
            <span key={item.key} aria-hidden="true" className="frontier-pagination__ellipsis">
              …
            </span>
          )
        }

        const currentItem = item.page === currentPage
        return (
          <PaginationControl
            key={item.page}
            aria-label={`Page ${String(item.page)}`}
            aria-current={currentItem ? 'page' : undefined}
            data-highlighted={currentItem || undefined}
            className="frontier-pagination__page"
            onClick={() => {
              goToPage(item.page)
            }}
          >
            {item.page}
          </PaginationControl>
        )
      })}
    </div>
  )
}
