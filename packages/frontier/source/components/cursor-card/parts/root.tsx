import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { type PointerEvent, type ReactElement, useContext, useMemo, useState } from 'react'

import { cursorCardPositionContext, cursorCardSettingsContext } from '../context.js'
import type { TCursorCardPosition, TCursorCardProps, TCursorCardZoneProps } from '../types.js'

export function CursorCardRoot({
  children,
  closeDelay = 0,
  defaultOpen = false,
  disabled = false,
  followAxis = 'both',
  onOpenChange,
  open,
  openDelay = 0,
}: TCursorCardProps): ReactElement {
  const [position, setPosition] = useState<TCursorCardPosition>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  })
  const settings = useMemo(
    () => ({ closeDelay, openDelay, track: setPosition }),
    [closeDelay, openDelay],
  )

  return (
    <cursorCardSettingsContext.Provider value={settings}>
      <cursorCardPositionContext.Provider value={position}>
        <BaseTooltip.Root
          open={open}
          defaultOpen={defaultOpen}
          disabled={disabled}
          disableHoverablePopup
          trackCursorAxis={followAxis}
          onOpenChange={(nextOpen) => {
            onOpenChange?.(nextOpen)
          }}
        >
          {children}
        </BaseTooltip.Root>
      </cursorCardPositionContext.Provider>
    </cursorCardSettingsContext.Provider>
  )
}

export function CursorCardZone({ children }: TCursorCardZoneProps): ReactElement {
  const { closeDelay, openDelay, track } = useContext(cursorCardSettingsContext)

  function follow(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch') {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    track({
      height: rect.height,
      width: rect.width,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  return (
    <BaseTooltip.Trigger
      delay={openDelay}
      closeDelay={closeDelay}
      render={children}
      onPointerMove={follow}
      onPointerEnter={follow}
    />
  )
}
