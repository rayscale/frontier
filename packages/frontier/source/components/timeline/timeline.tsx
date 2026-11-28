import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import {
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineRoot,
  TimelineTime,
  TimelineTitle,
} from './parts/sections.js'
import type { TTimelineProps } from './types.js'

import './timeline.css'

export type {
  TTimelineContentProps,
  TTimelineDescriptionProps,
  TTimelineIndicatorProps,
  TTimelineItemProps,
  TTimelineOrientation,
  TTimelineProps,
  TTimelineTimeProps,
  TTimelineTitleProps,
  TTimelineTone,
} from './types.js'

export interface TTimelineComponent extends ForwardRefExoticComponent<
  TTimelineProps & RefAttributes<HTMLOListElement>
> {
  /** The ordered list of events. It is the timeline itself. */
  Root: typeof TimelineRoot
  /** One event. Its `tone` sets the color of its indicator. */
  Item: typeof TimelineItem
  /** The mark of an event: a dot, or a circle around the icon you pass. */
  Indicator: typeof TimelineIndicator
  /** Holds the text of an event. */
  Content: typeof TimelineContent
  /** The name of an event. */
  Title: typeof TimelineTitle
  /** When an event happened. Pass `dateTime` so it can be read by machines. */
  Time: typeof TimelineTime
  /** The details of an event. */
  Description: typeof TimelineDescription
}

/**
 * Shows a list of events in the order they happened, joined by a line, such as the history of an
 * order or the activity on a project. Compose it with `Timeline.Item`, `Timeline.Indicator`, and
 * `Timeline.Content`, and add `Timeline.Title`, `Timeline.Time`, and `Timeline.Description`.
 */
export const Timeline: TTimelineComponent = Object.assign(TimelineRoot, {
  Root: TimelineRoot,
  Item: TimelineItem,
  Indicator: TimelineIndicator,
  Content: TimelineContent,
  Title: TimelineTitle,
  Time: TimelineTime,
  Description: TimelineDescription,
})
