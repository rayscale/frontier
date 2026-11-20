import type { ComponentType, ReactElement, ReactNode } from 'react'

import { omitUndefined } from '../../helpers/omit-undefined.js'

export type TFloatingSide = 'top' | 'right' | 'bottom' | 'left'

export type TFloatingAlign = 'start' | 'center' | 'end'

/** Where a floating popup sits relative to its trigger. */
export interface TFloatingPlacement {
  /** Side of the trigger the popup prefers. It flips when there is no room. */
  side?: TFloatingSide | undefined
  /** Alignment along the chosen side. */
  align?: TFloatingAlign | undefined
  /** Distance from the trigger, in pixels. */
  sideOffset?: number | undefined
  /** Shift along the alignment axis, in pixels. */
  alignOffset?: number | undefined
}

interface TPositionerBaseProps {
  side?: TFloatingSide
  align?: TFloatingAlign
  sideOffset?: number
  alignOffset?: number
  className?: string
  children?: ReactNode
}

interface TFloatingPopupProps<TPopupProps extends object, TPositionerProps extends object> {
  Portal: ComponentType<{ children?: ReactNode }>
  Positioner: ComponentType<TPositionerBaseProps & TPositionerProps>
  Popup: ComponentType<TPopupProps>
  /** Placement with defaults already applied. */
  placement: TFloatingPlacement
  popupProps: TPopupProps
  positionerClassName?: string | undefined
  positionerProps?: TPositionerProps | undefined
}

/** Renders a Base UI popup in a portal, positioned beside its trigger. */
export function FloatingPopup<TPopupProps extends object, TPositionerProps extends object = object>(
  props: TFloatingPopupProps<TPopupProps, TPositionerProps>,
): ReactElement {
  const { Portal, Popup, Positioner, placement, popupProps, positionerClassName, positionerProps } =
    props

  const positioner: TPositionerBaseProps & TPositionerProps = Object.assign(
    {},
    positionerProps,
    omitUndefined(placement),
    positionerClassName ? { className: positionerClassName } : {},
  )

  return (
    <Portal>
      <Positioner {...positioner}>
        <Popup {...popupProps} />
      </Positioner>
    </Portal>
  )
}
