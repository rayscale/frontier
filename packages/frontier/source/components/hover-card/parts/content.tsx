import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card'
import { forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { FloatingPopup } from '../../../internal/primitives/floating-popup/floating-popup.js'
import type { THoverCardContentProps } from '../types.js'

export const HoverCardContent = forwardRef<HTMLDivElement, THoverCardContentProps>(
  function HoverCardContent(
    {
      align = 'center',
      alignOffset = 0,
      children,
      className,
      side = 'bottom',
      sideOffset = 8,
      ...props
    },
    ref,
  ) {
    return (
      <FloatingPopup
        Portal={BasePreviewCard.Portal}
        Positioner={BasePreviewCard.Positioner}
        Popup={BasePreviewCard.Popup}
        placement={{ side, align, sideOffset, alignOffset }}
        popupProps={{
          ...props,
          ref,
          className: classNames('frontier-hover-card', 'frontier-floating-surface', className),
          children,
        }}
      />
    )
  },
)
