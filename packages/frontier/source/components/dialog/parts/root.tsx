import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import {
  cloneElement,
  isValidElement,
  type MouseEventHandler,
  type ReactElement,
  useRef,
} from 'react'

import { withConsumerClick } from '../../../internal/helpers/with-consumer-click.js'
import { Button } from '../../button/button.js'
import { dialogContext, useDialogContext } from '../context.js'
import type { TDialogProps, TDialogTriggerProps } from '../types.js'

export function DialogRoot({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: TDialogProps): ReactElement {
  const closeOnBackdropClickRef = useRef(true)

  const handleOpenChange = (
    nextOpen: boolean,
    eventDetails: BaseDialog.Root.ChangeEventDetails,
  ) => {
    if (!nextOpen && eventDetails.reason === 'outside-press' && !closeOnBackdropClickRef.current) {
      eventDetails.cancel()

      return
    }

    onOpenChange?.(nextOpen)
  }

  return (
    <dialogContext.Provider value={{ closeOnBackdropClickRef }}>
      <BaseDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={handleOpenChange}>
        {children}
      </BaseDialog.Root>
    </dialogContext.Provider>
  )
}

export function DialogTrigger({ children }: TDialogTriggerProps): ReactElement {
  useDialogContext('Dialog.Trigger')

  const trigger: ReactElement<{ onClick?: MouseEventHandler<HTMLElement> }> = isValidElement<{
    onClick?: MouseEventHandler<HTMLElement> | undefined
  }>(children) ? (
    children
  ) : (
    <Button>{children}</Button>
  )

  return (
    <BaseDialog.Trigger
      render={cloneElement(trigger, {
        onClick: withConsumerClick(trigger.props.onClick),
      })}
    />
  )
}
