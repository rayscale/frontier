import { type ElementType, forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import type {
  TTimelineContentProps,
  TTimelineDescriptionProps,
  TTimelineIndicatorProps,
  TTimelineItemProps,
  TTimelineProps,
  TTimelineTimeProps,
  TTimelineTitleProps,
} from '../types.js'

export const TimelineRoot = forwardRef<HTMLOListElement, TTimelineProps>(function TimelineRoot(
  { className, orientation = 'vertical', ...props },
  ref,
) {
  return (
    <ol
      {...props}
      ref={ref}
      className={classNames('frontier-timeline', className)}
      data-orientation={orientation}
    />
  )
})

export const TimelineItem = forwardRef<HTMLLIElement, TTimelineItemProps>(function TimelineItem(
  { className, tone = 'neutral', ...props },
  ref,
) {
  return (
    <li
      {...props}
      ref={ref}
      className={classNames('frontier-timeline__item', className)}
      data-tone={tone}
    />
  )
})

export const TimelineIndicator = forwardRef<HTMLSpanElement, TTimelineIndicatorProps>(
  function TimelineIndicator({ className, ...props }, ref) {
    return (
      <span
        aria-hidden="true"
        {...props}
        ref={ref}
        className={classNames('frontier-timeline__indicator', className)}
      />
    )
  },
)

export const TimelineContent = forwardRef<HTMLDivElement, TTimelineContentProps>(
  function TimelineContent({ className, ...props }, ref) {
    return (
      <div {...props} ref={ref} className={classNames('frontier-timeline__content', className)} />
    )
  },
)

export const TimelineTitle = forwardRef<HTMLElement, TTimelineTitleProps>(function TimelineTitle(
  { as: Element = 'p', className, ...props },
  ref,
) {
  const Component = Element as ElementType

  return (
    <Component {...props} ref={ref} className={classNames('frontier-timeline__title', className)} />
  )
})

export const TimelineTime = forwardRef<HTMLTimeElement, TTimelineTimeProps>(function TimelineTime(
  { className, ...props },
  ref,
) {
  return <time {...props} ref={ref} className={classNames('frontier-timeline__time', className)} />
})

export const TimelineDescription = forwardRef<HTMLParagraphElement, TTimelineDescriptionProps>(
  function TimelineDescription({ className, ...props }, ref) {
    return (
      <p {...props} ref={ref} className={classNames('frontier-timeline__description', className)} />
    )
  },
)
