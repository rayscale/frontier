import {
  Children,
  cloneElement,
  type ComponentPropsWithoutRef,
  isValidElement,
  type ReactElement,
} from 'react'

import { classNames } from '../../internal/helpers/class-names.js'
import { CursorCard } from '../cursor-card/cursor-card.js'

import type { TMagnifierProps } from './types.js'

import './magnifier.css'

export type { TMagnifierProps } from './types.js'

/**
 * Shows a lens that follows the pointer over an image and shows the part under it larger, so
 * people can look at the detail without leaving the page. It needs a pointer that hovers, so it
 * does not open on a touch screen. It is built on `CursorCard`.
 */
export function Magnifier({
  children,
  disabled = false,
  openDelay = 0,
  shape = 'circle',
  size = 160,
  src,
  zoom = 2,
}: TMagnifierProps): ReactElement {
  const child = Children.only(children)

  if (!isValidElement<ComponentPropsWithoutRef<'img'>>(child) || child.type !== 'img') {
    throw new Error('Magnifier needs one img element as its child.')
  }

  const source = src ?? child.props.src

  return (
    <CursorCard disabled={disabled || !source} openDelay={openDelay}>
      <CursorCard.Zone>
        {cloneElement(child, {
          className: classNames('frontier-magnifier', child.props.className),
        })}
      </CursorCard.Zone>
      <CursorCard.Content
        align="center"
        aria-hidden="true"
        // The lens is centered on the pointer: it sits below it, moved up by half its height.
        side="bottom"
        sideOffset={-size / 2}
        style={{
          width: size,
          height: size,
          padding: 0,
          overflow: 'hidden',
          borderRadius:
            shape === 'circle' ? 'var(--frontier-radius-full)' : 'var(--frontier-radius-md)',
        }}
      >
        {(position) => (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${JSON.stringify(source)})`,
              backgroundPosition: `${String(size / 2 - position.x * zoom)}px ${String(size / 2 - position.y * zoom)}px`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: `${String(position.width * zoom)}px ${String(position.height * zoom)}px`,
            }}
          />
        )}
      </CursorCard.Content>
    </CursorCard>
  )
}
