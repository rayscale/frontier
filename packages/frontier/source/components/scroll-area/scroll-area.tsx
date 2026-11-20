import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import { type CSSProperties, forwardRef, type HTMLAttributes, type ReactNode } from 'react'

import './scroll-area.css'

export type TScrollAreaOrientation = 'vertical' | 'horizontal' | 'both'

/** Controls which custom scrollbar orientations are displayed. */
export type TScrollAreaScrollbar = 'none' | 'vertical' | 'horizontal' | 'both' | 'auto'

/**
 * `none` shows no edge indicator, `fade` fades the content at edges with hidden content,
 * and `blur` blurs the content at those edges, gradually sharpening toward the middle.
 * The blur needs `backdrop-filter` support. Without it, `blur` falls back to `fade`.
 */
export type TScrollAreaEdgeEffect = 'none' | 'fade' | 'blur'

export type TScrollAreaProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style'> & {
  /** Axes that can scroll. Overflow on the other axis is clipped. Defaults to `vertical`. */
  orientation?: TScrollAreaOrientation
  /**
   * Which custom scrollbar orientations to show. Defaults to `none`.
   * Orientation options are limited to the axes enabled by `orientation`.
   * `auto` shows those bars on hover or while scrolling; legacy `visible` shows
   * both enabled axes and `hidden` is equivalent to `none`.
   */
  scrollbar?: TScrollAreaScrollbar
  /**
   * Edge indicator for the sides that have hidden content in the scroll direction. Defaults to `none`.
   */
  edgeEffect?: TScrollAreaEdgeEffect
  /**
   * Length of the edge effect, such as `"24px"`. Defaults to `24px`.
   */
  edgeEffectSize?: string
  /** Applied to the root wrapper. */
  className?: string
  /** Applied to the root wrapper. */
  style?: CSSProperties
  children?: ReactNode
}

/**
 * A native scrollable region with optional custom scrollbars.
 * `className` and `style` apply to the root wrapper.
 * All other HTML attributes and the ref apply to the viewport, which becomes
 * keyboard-focusable when content overflows.
 */
export const ScrollArea = forwardRef<HTMLDivElement, TScrollAreaProps>(function ScrollArea(
  {
    orientation = 'vertical',
    scrollbar = 'none',
    edgeEffect,
    edgeEffectSize,
    className,
    style,
    children,
    ...viewportProps
  },
  ref,
) {
  const verticalAxis = orientation !== 'horizontal'
  const horizontalAxis = orientation !== 'vertical'
  const scrollbarMode = scrollbar
  const showVerticalScrollbar =
    verticalAxis &&
    (scrollbarMode === 'vertical' || scrollbarMode === 'both' || scrollbarMode === 'auto')
  const showHorizontalScrollbar =
    horizontalAxis &&
    (scrollbarMode === 'horizontal' || scrollbarMode === 'both' || scrollbarMode === 'auto')
  const resolvedEdgeEffect: TScrollAreaEdgeEffect = edgeEffect ?? 'none'

  const rootClassName = [
    'frontier-scroll-area',
    scrollbarMode === 'auto' && 'frontier-scroll-area--auto-scrollbar',
    resolvedEdgeEffect !== 'none' && `frontier-scroll-area--${resolvedEdgeEffect}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const rootStyle: CSSProperties = {
    ...style,
    ...(edgeEffectSize === undefined ? {} : { '--_scroll-area-edge-size': edgeEffectSize }),
  }
  const viewportStyle: CSSProperties = {
    ...(verticalAxis ? {} : { overflowY: 'hidden' }),
    ...(horizontalAxis ? {} : { overflowX: 'hidden' }),
  }

  return (
    <BaseScrollArea.Root className={rootClassName} style={rootStyle}>
      <BaseScrollArea.Viewport
        ref={ref}
        className="frontier-scroll-area__viewport"
        style={viewportStyle}
        {...viewportProps}
      >
        <BaseScrollArea.Content
          className={
            horizontalAxis
              ? 'frontier-scroll-area__content'
              : 'frontier-scroll-area__content frontier-scroll-area__content--vertical'
          }
          style={horizontalAxis ? undefined : { minWidth: '100%' }}
        >
          {children}
        </BaseScrollArea.Content>
      </BaseScrollArea.Viewport>

      {showVerticalScrollbar && (
        <BaseScrollArea.Scrollbar
          orientation="vertical"
          className="frontier-scroll-area__scrollbar frontier-scroll-area__scrollbar--vertical"
        >
          <BaseScrollArea.Thumb className="frontier-scroll-area__thumb" />
        </BaseScrollArea.Scrollbar>
      )}

      {showHorizontalScrollbar && (
        <BaseScrollArea.Scrollbar
          orientation="horizontal"
          className="frontier-scroll-area__scrollbar frontier-scroll-area__scrollbar--horizontal"
        >
          <BaseScrollArea.Thumb className="frontier-scroll-area__thumb" />
        </BaseScrollArea.Scrollbar>
      )}

      {showVerticalScrollbar && showHorizontalScrollbar && (
        <BaseScrollArea.Corner className="frontier-scroll-area__corner" />
      )}

      {resolvedEdgeEffect === 'blur' && (
        <>
          {verticalAxis && (
            <>
              <div className="frontier-scroll-area__edge frontier-scroll-area__edge--top" />
              <div className="frontier-scroll-area__edge frontier-scroll-area__edge--bottom" />
            </>
          )}
          {horizontalAxis && (
            <>
              <div className="frontier-scroll-area__edge frontier-scroll-area__edge--start" />
              <div className="frontier-scroll-area__edge frontier-scroll-area__edge--end" />
            </>
          )}
        </>
      )}
    </BaseScrollArea.Root>
  )
})
