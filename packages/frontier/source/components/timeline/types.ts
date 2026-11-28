import type {
  HTMLAttributes,
  LiHTMLAttributes,
  OlHTMLAttributes,
  ReactNode,
  TimeHTMLAttributes,
} from 'react'

/** Direction in which the events follow each other. */
export type TTimelineOrientation = 'vertical' | 'horizontal'

/** Meaning of an event, shown in the color of its indicator. */
export type TTimelineTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

/** Props for the {@link Timeline} component. It is an ordered list, so it takes the props of an `ol`. */
export type TTimelineProps = OlHTMLAttributes<HTMLOListElement> & {
  /** Direction of the line. `vertical` stacks the events, `horizontal` puts them side by side. Defaults to `vertical`. */
  orientation?: TTimelineOrientation | undefined
}

/** Props for `Timeline.Item`, which is one event. */
export type TTimelineItemProps = LiHTMLAttributes<HTMLLIElement> & {
  /** Meaning of the event. Defaults to `neutral`. */
  tone?: TTimelineTone | undefined
}

/** Props for `Timeline.Indicator`. Without children it is a dot; with an icon it is a circle around it. */
export type TTimelineIndicatorProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode | undefined
}

/** Props for `Timeline.Content`, which holds the text of an event. */
export type TTimelineContentProps = HTMLAttributes<HTMLDivElement>

/** Props for `Timeline.Title`, which names the event. */
export type TTimelineTitleProps = HTMLAttributes<HTMLElement> & {
  /** Element to render. Defaults to `p`. */
  as?: 'p' | 'div' | 'h3' | 'h4' | 'h5' | undefined
}

/** Props for `Timeline.Time`, which says when the event happened. It takes the props of a `time`. */
export type TTimelineTimeProps = TimeHTMLAttributes<HTMLTimeElement>

/** Props for `Timeline.Description`, which gives the details of the event. */
export type TTimelineDescriptionProps = HTMLAttributes<HTMLParagraphElement>
