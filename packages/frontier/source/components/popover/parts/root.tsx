import { Popover as BasePopover } from '@base-ui/react/popover'
import { isValidElement, type ReactElement } from 'react'

import { Button } from '../../button/button.js'
import type { TPopoverProps, TPopoverTriggerProps } from '../types.js'

export function PopoverRoot({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: TPopoverProps): ReactElement {
  return (
    <BasePopover.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)}
    >
      {children}
    </BasePopover.Root>
  )
}

export function PopoverTrigger({ children }: TPopoverTriggerProps): ReactElement {
  const trigger = isValidElement(children) ? children : <Button>{children}</Button>

  return <BasePopover.Trigger render={trigger} />
}
