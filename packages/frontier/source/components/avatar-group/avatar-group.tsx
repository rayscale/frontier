import { Children, type CSSProperties, type ReactElement } from 'react'

import { itemKey } from './helpers/item-key.js'
import type { TAvatarGroupProps } from './types.js'

import './avatar-group.css'

export type { TAvatarGroupProps } from './types.js'

type TAvatarGroupStyle = CSSProperties & {
  '--_avatar-group-overlap': string
}

/**
 * Arranges items with overlap and optionally limits how many are shown.
 * The hidden-items indicator is not included in the `max` limit.
 */
export function AvatarGroup({
  children,
  className,
  max,
  size = 'medium',
  spacing = 8,
  orientation = 'horizontal',
  overflow,
  ...props
}: TAvatarGroupProps): ReactElement {
  const items = Children.toArray(children)
  const limit =
    max === undefined || !Number.isFinite(max) ? items.length : Math.max(0, Math.floor(max))
  const visibleItems = items.slice(0, limit)
  const hiddenCount = items.length - visibleItems.length
  const overlap = Number.isFinite(spacing) ? Math.max(0, spacing) : 8
  const style: TAvatarGroupStyle = {
    ...props.style,
    '--_avatar-group-overlap': `${String(overlap)}px`,
  }
  const classes = [
    'frontier-avatar-group',
    `frontier-avatar-group--${size}`,
    `frontier-avatar-group--${orientation}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div {...props} className={classes} style={style}>
      {visibleItems.map((item, index) => (
        <div className="frontier-avatar-group__item" key={itemKey(item, index)}>
          {item}
        </div>
      ))}
      {hiddenCount > 0 && (
        <div className="frontier-avatar-group__item">
          <span
            className="frontier-avatar-group__overflow"
            role="img"
            aria-label={`${String(hiddenCount)} more ${hiddenCount === 1 ? 'avatar' : 'avatars'}`}
          >
            <span aria-hidden="true">
              {overflow === undefined ? `+${String(hiddenCount)}` : overflow}
            </span>
          </span>
        </div>
      )}
    </div>
  )
}
