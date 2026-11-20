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
import { drawerContext, useDrawerContext } from '../context.js'
import { swipeDirectionBySide } from '../helpers/swipe.js'
import { useDrawerStack } from '../hooks/use-drawer-stack.js'
import type { TDrawerProps, TDrawerTriggerProps } from '../types.js'

export function DrawerRoot({
  open,
  defaultOpen = false,
  onOpenChange,
  side = 'right',
  children,
}: TDrawerProps): ReactElement {
  const actionsRef = useRef<BaseDrawer.Root.Actions | null>(null)
  const { closeOnBackdropClickRef, stackEntry } = useDrawerStack(actionsRef)

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
    <drawerContext.Provider value={{ closeOnBackdropClickRef, side, stackEntry }}>
      <BaseDrawer.Root
        open={open}
        defaultOpen={defaultOpen}
        actionsRef={actionsRef}
        onOpenChange={handleOpenChange}
        swipeDirection={swipeDirectionBySide[side]}
      >
        {children}
      </BaseDrawer.Root>
    </drawerContext.Provider>
  )
}

export function DrawerTrigger({ children }: TDrawerTriggerProps): ReactElement {
  useDrawerContext('Drawer.Trigger')

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
