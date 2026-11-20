import type { CSSProperties, HTMLAttributes, PointerEvent, ReactElement } from 'react'

import { resolveRadius, type TRadiusToken } from '../../internal/helpers/resolve-radius.js'

import './skeleton.css'

/** Basic placeholder shapes. Dimensions can always be overridden. */
export type TSkeletonVariant = 'text' | 'circular' | 'rectangular'

/** Placeholder animations. */
export type TSkeletonAnimation = 'shimmer' | 'pulse' | 'none'

/** One radius token names. */
export type TSkeletonRadiusToken = TRadiusToken

/** Props for {@link Skeleton}, in addition to native `span` attributes. */
export type TSkeletonProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** Additional CSS class for the placeholder element. */
  className?: string | undefined
  /**
   * Placeholder animation. Defaults to `shimmer`. Both animations are disabled
   * when the user prefers reduced motion.
   */
  animation?: TSkeletonAnimation | undefined
  /**
   * Border radius. A One token name maps to its radius token, a number is
   * treated as pixels, and any other string is used as CSS as provided.
   */
  radius?: TSkeletonRadiusToken | number | (string & NonNullable<unknown>) | undefined
  /** Placeholder height. A number is treated as pixels. */
  height?: number | (string & NonNullable<unknown>) | undefined
  /** Placeholder width. A number is treated as pixels. */
  width?: number | (string & NonNullable<unknown>) | undefined
  /**
   * Basic shape. `text` is a short line, `rectangular` is a block, and
   * `circular` is a circle. Circular keeps its shape when only one dimension
   * is set. When both dimensions are set, they are honored as given, so the
   * result can be an ellipse.
   */
  variant?: TSkeletonVariant | undefined
}

/**
 * Renders a decorative loading placeholder. Compose several skeletons to build
 * any loading layout. The element is hidden from assistive technology and is
 * not focusable, so announce the loading state on a surrounding container.
 */
export function Skeleton({
  className,
  animation = 'shimmer',
  height,
  onPointerMove,
  radius,
  style,
  variant = 'rectangular',
  width,
  ...props
}: TSkeletonProps): ReactElement {
  const handlePointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    onPointerMove?.(event)
    event.currentTarget.style.setProperty(
      '--_skeleton-pointer-x',
      `${String(event.nativeEvent.offsetX)}px`,
    )
    event.currentTarget.style.setProperty(
      '--_skeleton-pointer-y',
      `${String(event.nativeEvent.offsetY)}px`,
    )
  }

  const resolvedWidth = variant === 'circular' && width === undefined ? height : width

  const inlineStyle: CSSProperties = { ...style }
  if (resolvedWidth !== undefined) {
    inlineStyle.width = resolvedWidth
  }

  if (height !== undefined) {
    inlineStyle.height = height
  }

  const resolvedRadius = resolveRadius(radius)
  if (resolvedRadius !== undefined) {
    inlineStyle.borderRadius = resolvedRadius
  }

  const classes = [
    'frontier-skeleton',
    `frontier-skeleton--${variant}`,
    `frontier-skeleton--${animation}`,
    animation !== 'none' && 'frontier-skeleton--spotlight',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      aria-hidden="true"
      {...props}
      className={classes}
      style={inlineStyle}
      onPointerMove={handlePointerMove}
    />
  )
}
