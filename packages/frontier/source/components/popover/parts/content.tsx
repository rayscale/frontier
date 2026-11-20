import { Popover as BasePopover } from '@base-ui/react/popover'
import { forwardRef, type ReactElement } from 'react'

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
    const classes = ['frontier-popover', 'frontier-floating-surface', className]
      .filter(Boolean)
      .join(' ')

    return (
      <BasePopover.Portal>
        <BasePopover.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <BasePopover.Popup {...props} ref={ref} className={classes}>
            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    )
  },
)

export function PopoverClose(props: TPopoverCloseProps): ReactElement {
  return <BasePopover.Close render={<Button variant="outline" {...props} type="button" />} />
}
