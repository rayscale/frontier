import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import {
  cloneElement,
  isValidElement,
  type MouseEventHandler,
  type ReactElement,
  useRef,
} from 'react'

import { withConsumerClick } from '../../../internal/helpers/with-consumer-click.js'
import { Button } from '../../button/button.js'
import { sheetContext, useSheetContext } from '../context.js'
import { swipeDirectionBySide } from '../helpers/swipe.js'
import { useSheetStack } from '../hooks/use-sheet-stack.js'
import type { TSheetProps, TSheetTriggerProps } from '../types.js'

export function SheetRoot({
  open,
  defaultOpen = false,
  onOpenChange,
  side = 'right',
  children,
}: TSheetProps): ReactElement {
  const actionsRef = useRef<BaseDrawer.Root.Actions | null>(null)
  const { closeOnBackdropClickRef, stackEntry } = useSheetStack(actionsRef)

  const handleOpenChange = (
    nextOpen: boolean,
    eventDetails: BaseDrawer.Root.ChangeEventDetails,
  ) => {
    if (!nextOpen && eventDetails.reason === 'outside-press' && !closeOnBackdropClickRef.current) {
      eventDetails.cancel()

      return
    }

    onOpenChange?.(nextOpen)
  }

  return (
    <sheetContext.Provider value={{ closeOnBackdropClickRef, side, stackEntry }}>
      <BaseDrawer.Root
        open={open}
        defaultOpen={defaultOpen}
        actionsRef={actionsRef}
        onOpenChange={handleOpenChange}
        swipeDirection={swipeDirectionBySide[side]}
      >
        {children}
      </BaseDrawer.Root>
    </sheetContext.Provider>
  )
}

export function SheetTrigger({ children }: TSheetTriggerProps): ReactElement {
  useSheetContext('Sheet.Trigger')

  const trigger: ReactElement<{ onClick?: MouseEventHandler<HTMLElement> }> = isValidElement<{
    onClick?: MouseEventHandler<HTMLElement>
  }>(children) ? (
    children
  ) : (
    <Button>{children}</Button>
  )

  return (
    <BaseDrawer.Trigger
      render={cloneElement(trigger, {
        onClick: withConsumerClick(trigger.props.onClick),
      })}
    />
  )
}
