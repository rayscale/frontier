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
        select(item.id)
      }
    }

    return {
      count,
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
  }, [count, index, items, loop, onValueChange, value])

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
