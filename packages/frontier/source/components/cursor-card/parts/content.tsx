import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { forwardRef, useContext } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { FloatingPopup } from '../../../internal/primitives/floating-popup/floating-popup.js'
import { cursorCardPositionContext } from '../context.js'
import type { TCursorCardContentProps } from '../types.js'

export const CursorCardContent = forwardRef<HTMLDivElement, TCursorCardContentProps>(
  function CursorCardContent(
    {
      align = 'start',
      alignOffset = 0,
      children,
      className,
      side = 'bottom',
      sideOffset = 12,
      ...props
    },
    ref,
  ) {
    const position = useContext(cursorCardPositionContext)

    return (
      <FloatingPopup
        Portal={BaseTooltip.Portal}
        Positioner={BaseTooltip.Positioner}
        Popup={BaseTooltip.Popup}
        placement={{ side, align, sideOffset, alignOffset }}
        popupProps={{
          ...props,
          ref,
          className: classNames('frontier-cursor-card', 'frontier-floating-surface', className),
          children: typeof children === 'function' ? children(position) : children,
        }}
      />
    )
  },
)
