import { Popover as BasePopover } from '@base-ui/react/popover'
import { forwardRef, type ReactElement } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { FloatingPopup } from '../../../internal/primitives/floating-popup/floating-popup.js'
import { Button } from '../../button/button.js'
import type { TPopoverCloseProps, TPopoverContentProps } from '../types.js'

export const PopoverContent = forwardRef<HTMLDivElement, TPopoverContentProps>(
  function PopoverContent(
    {
      side = 'bottom',
      align = 'center',
      sideOffset = 8,
      alignOffset = 0,
      className,
      children,
      ...props
    },
    ref,
  ) {
    return (
      <FloatingPopup
        Portal={BasePopover.Portal}
        Positioner={BasePopover.Positioner}
        Popup={BasePopover.Popup}
        placement={{ side, align, sideOffset, alignOffset }}
        popupProps={{
          ...props,
          ref,
          className: classNames('frontier-popover', 'frontier-floating-surface', className),
          children,
        }}
      />
    )
  },
)

export function PopoverClose(props: TPopoverCloseProps): ReactElement {
  return <BasePopover.Close render={<Button variant="outline" {...props} type="button" />} />
}
