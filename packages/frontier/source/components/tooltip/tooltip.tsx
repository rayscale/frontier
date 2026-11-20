import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import type { ReactElement } from 'react'

import type { TTooltipProps } from './types.js'

import './tooltip.css'

const pointerIntentDelay = 400

/** Names or briefly explains its trigger on pointer rest and keyboard focus. */
export function Tooltip(props: TTooltipProps): ReactElement {
  const { children, content, disabled = false, side = 'top' } = props

  return (
    <TooltipPrimitive.Root disabled={disabled}>
      <TooltipPrimitive.Trigger delay={pointerIntentDelay} render={children} />
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Positioner className="frontier-tooltip__positioner" side={side}>
          <TooltipPrimitive.Popup className="frontier-tooltip">{content}</TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
