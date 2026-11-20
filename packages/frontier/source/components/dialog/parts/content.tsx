import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { forwardRef, type ReactElement, useLayoutEffect } from 'react'

import { withConsumerClick } from '../../../internal/helpers/with-consumer-click.js'
import { X } from '../../../symbols/index.js'
import { Button } from '../../button/button.js'
import { useDialogContext } from '../context.js'
import type { TDialogCloseProps, TDialogContentProps } from '../types.js'

export const DialogContent = forwardRef<HTMLDivElement, TDialogContentProps>(function DialogContent(
  {
    size = 'medium',
    showCloseButton = true,
    closeOnBackdropClick = true,
    className,
    children,
    ...props
  },
  ref,
) {
  const { closeOnBackdropClickRef } = useDialogContext('Dialog.Content')

  useLayoutEffect(() => {
    closeOnBackdropClickRef.current = closeOnBackdropClick
  }, [closeOnBackdropClick, closeOnBackdropClickRef])

  const classes = ['frontier-dialog', `frontier-dialog--${size}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="frontier-dialog__backdrop" />
      <BaseDialog.Popup {...props} ref={ref} className={classes}>
        <div className="frontier-dialog__body">
          {children}
          {showCloseButton && (
            <BaseDialog.Close
              render={
                <Button
                  variant="ghost"
                  size="symbol"
                  className="frontier-dialog__close-button"
                  aria-label="Close dialog"
                />
              }
            >
              <X aria-hidden="true" />
            </BaseDialog.Close>
          )}
        </div>
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  )
})

export function DialogClose({ onClick, ...props }: TDialogCloseProps): ReactElement {
  useDialogContext('Dialog.Close')

  return (
    <BaseDialog.Close
      render={
        <Button variant="outline" {...props} type="button" onClick={withConsumerClick(onClick)} />
      }
    />
  )
}
