import { forwardRef, useEffect } from 'react'

import { ImageZoom } from '../../image-zoom/image-zoom.js'
import { useLightboxContext } from '../context.js'
import type { TLightboxContentProps } from '../types.js'

import {
  LightboxCaption,
  LightboxCounter,
  LightboxFooter,
  LightboxNext,
  LightboxPrevious,
  LightboxThumbnails,
} from './sections.js'

/** Room kept under the picture for the strip of small pictures, in pixels. */
const thumbnailsSpace = 48

export const LightboxContent = forwardRef<HTMLDivElement, TLightboxContentProps>(
  function LightboxContent({ children, label, onKeyDown, thumbnails = true, ...props }, ref) {
    const { count, direction, goTo, index, item, items, next, previous } =
      useLightboxContext('Lightbox.Content')
    const several = count > 1

    // The pictures next to the shown one load before people ask for them.
    useEffect(() => {
      for (const neighbor of [items[index - 1], items[index + 1]]) {
        if (neighbor) {
          new Image().src = neighbor.src
        }
      }
    }, [index, items])

    return (
      <ImageZoom.Content
        {...props}
        ref={ref}
        alt={item?.alt ?? ''}
        bottomSpace={children === undefined && several && thumbnails ? thumbnailsSpace : 0}
        direction={direction}
        label={label ?? item?.alt}
        src={item?.src}
        onKeyDown={(event) => {
          // The image keeps the arrows while it is zoomed, to move around in it.
          if (!event.defaultPrevented) {
            if (event.key === 'ArrowLeft') {
              event.preventDefault()
              previous()
            } else if (event.key === 'ArrowRight') {
              event.preventDefault()
              next()
            } else if (event.key === 'Home') {
              event.preventDefault()
              goTo(0)
            } else if (event.key === 'End') {
              event.preventDefault()
              goTo(count - 1)
            }
          }

          onKeyDown?.(event)
        }}
      >
        {children ?? (
          <>
            <ImageZoom.Toolbar>
              {several && <LightboxCounter />}
              <ImageZoom.ZoomOut />
              <ImageZoom.ZoomIn />
              <ImageZoom.Close />
            </ImageZoom.Toolbar>
            {several && (
              <>
                <LightboxPrevious />
                <LightboxNext />
              </>
            )}
            <LightboxFooter>
              <LightboxCaption />
              {several && thumbnails && <LightboxThumbnails />}
            </LightboxFooter>
          </>
        )}
      </ImageZoom.Content>
    )
  },
)
