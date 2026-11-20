import { forwardRef } from 'react'

import { ChevronLeft, ChevronRight } from '../../icons/index.js'
import { classNames } from '../../internal/helpers/class-names.js'
import { Card } from '../card/card.js'

import type { TPagerItem, TPagerProps } from './types.js'

import './pager.css'

function PagerLink({
  direction,
  directionLabel,
  item,
}: {
  direction: 'previous' | 'next'
  directionLabel: string
  item: TPagerItem
}) {
  const nextState = direction === 'next'

  return (
    <a className="frontier-pager__link" data-direction={direction} href={item.href}>
      <Card className="frontier-pager__card">
        <Card.Header>
          <span className="frontier-pager__direction">
            {nextState ? null : <ChevronLeft aria-hidden="true" size={16} />}
            {directionLabel}
            {nextState ? <ChevronRight aria-hidden="true" size={16} /> : null}
          </span>
          <Card.Title as="p" className="frontier-pager__title">
            {item.label}
          </Card.Title>
        </Card.Header>
      </Card>
    </a>
  )
}

/**
 * Links to the previous and next destinations. It is designed for sequential
 * navigation such as documentation, not for numeric pagination.
 */
export const Pager = forwardRef<HTMLElement, TPagerProps>(function Pager(
  {
    previous,
    next,
    previousLabel = 'Previous',
    nextLabel = 'Next',
    label = 'Pagination',
    className,
    ...props
  },
  ref,
) {
  if (!previous && !next) {
    return null
  }

  return (
    <nav
      ref={ref}
      aria-label={label}
      className={classNames('frontier-pager', className)}
      {...props}
    >
      {previous ? (
        <PagerLink direction="previous" directionLabel={previousLabel} item={previous} />
      ) : null}
      {next ? <PagerLink direction="next" directionLabel={nextLabel} item={next} /> : null}
    </nav>
  )
})

export type { TPagerItem, TPagerProps } from './types.js'
