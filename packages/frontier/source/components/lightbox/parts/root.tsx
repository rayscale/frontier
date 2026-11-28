import { type ReactElement, useMemo, useState } from 'react'

import { ImageZoom } from '../../image-zoom/image-zoom.js'
import { lightboxContext, type TLightboxContextValue } from '../context.js'
import type { TLightboxProps, TLightboxTriggerProps } from '../types.js'

export function LightboxRoot({
  children,
  defaultValue,
  items,
  loop = false,
  onValueChange,
  value,
  ...props
}: TLightboxProps): ReactElement {
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.id)
  const currentId = value ?? internalValue
  const count = items.length
  const index = Math.max(
    0,
    items.findIndex((item) => item.id === currentId),
  )

  // Which way people went to the shown picture. The buttons say it themselves, because going
  // round from the last picture to the first is still going forward. Otherwise the order says it.
  const [travel, setTravel] = useState<{
    direction: TLightboxContextValue['direction']
    index: number
  }>({ direction: 'forward', index })
  if (travel.index !== index) {
    setTravel({ direction: index > travel.index ? 'forward' : 'backward', index })
  }

  const contextValue = useMemo<TLightboxContextValue>(() => {
    const select = (id: string): void => {
      if (value === undefined) {
        setInternalValue(id)
      }

      onValueChange?.(id)
    }

    const goTo = (target: number): void => {
      const wrapped = loop ? (target + count) % count : target
      const item = items[wrapped]

      if (item && wrapped !== index) {
        // A target past the end is still ahead, even though it wraps to an earlier picture.
        setTravel({ direction: target > index ? 'forward' : 'backward', index: wrapped })
        select(item.id)
      }
    }

    return {
      count,
      direction: travel.direction,
      goTo,
      index,
      item: items[index],
      items,
      next: () => {
        goTo(index + 1)
      },
      nextAvailable: loop ? count > 1 : index < count - 1,
      previous: () => {
        goTo(index - 1)
      },
      previousAvailable: loop ? count > 1 : index > 0,
    }
  }, [count, index, items, loop, onValueChange, travel.direction, value])

  return (
    <lightboxContext.Provider value={contextValue}>
      <ImageZoom
        {...props}
        value={items[index]?.id}
        onValueChange={(id) => {
          const item = items.find((candidate) => candidate.id === id)

          if (item) {
            if (value === undefined) {
              setInternalValue(item.id)
            }

            onValueChange?.(item.id)
          }
        }}
      >
        {children}
      </ImageZoom>
    </lightboxContext.Provider>
  )
}

export function LightboxTrigger({
  children,
  className,
  value,
}: TLightboxTriggerProps): ReactElement {
  return (
    <ImageZoom.Trigger {...(className === undefined ? {} : { className })} value={value}>
      {children}
    </ImageZoom.Trigger>
  )
}
