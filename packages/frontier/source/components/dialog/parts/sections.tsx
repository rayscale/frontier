import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import type { ReactElement } from 'react'

import { useDialogContext } from '../context.js'
import type {
  TDialogDescriptionProps,
  TDialogFooterProps,
  TDialogHeaderProps,
  TDialogTitleProps,
} from '../types.js'

export function DialogHeader({ className, ...props }: TDialogHeaderProps): ReactElement {
  return (
    <div {...props} className={['frontier-dialog__header', className].filter(Boolean).join(' ')} />
  )
}

export function DialogTitle({ className, ...props }: TDialogTitleProps): ReactElement {
  useDialogContext('Dialog.Title')

  return (
    <BaseDialog.Title
      {...props}
      className={['frontier-dialog__title', className].filter(Boolean).join(' ')}
    />
  )
}

export function DialogDescription({ className, ...props }: TDialogDescriptionProps): ReactElement {
  useDialogContext('Dialog.Description')

  return (
    <BaseDialog.Description
      {...props}
      className={['frontier-dialog__description', className].filter(Boolean).join(' ')}
    />
  )
}

export function DialogFooter({ className, ...props }: TDialogFooterProps): ReactElement {
  return (
    <div {...props} className={['frontier-dialog__footer', className].filter(Boolean).join(' ')} />
  )
}
