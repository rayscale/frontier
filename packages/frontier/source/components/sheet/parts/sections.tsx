import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import type { ReactElement } from 'react'

import { withConsumerClick } from '../../../internal/helpers/with-consumer-click.js'
import { Button } from '../../button/button.js'
import { useSheetContext } from '../context.js'
import type {
  TSheetCloseProps,
  TSheetDescriptionProps,
  TSheetFooterProps,
  TSheetHeaderProps,
  TSheetTitleProps,
} from '../types.js'

export function SheetHeader({ className, ...props }: TSheetHeaderProps): ReactElement {
  return (
    <div {...props} className={['frontier-sheet__header', className].filter(Boolean).join(' ')} />
  )
}

export function SheetTitle({ className, ...props }: TSheetTitleProps): ReactElement {
  useSheetContext('Sheet.Title')

  return (
    <BaseDrawer.Title
      {...props}
      className={['frontier-sheet__title', className].filter(Boolean).join(' ')}
    />
  )
}

export function SheetDescription({ className, ...props }: TSheetDescriptionProps): ReactElement {
  useSheetContext('Sheet.Description')

  return (
    <BaseDrawer.Description
      {...props}
      className={['frontier-sheet__description', className].filter(Boolean).join(' ')}
    />
  )
}

export function SheetFooter({ className, ...props }: TSheetFooterProps): ReactElement {
  return (
    <div {...props} className={['frontier-sheet__footer', className].filter(Boolean).join(' ')} />
  )
}

export function SheetClose({ onClick, ...props }: TSheetCloseProps): ReactElement {
  useSheetContext('Sheet.Close')

  return (
    <BaseDrawer.Close
      render={
        <Button variant="outline" {...props} type="button" onClick={withConsumerClick(onClick)} />
      }
    />
  )
}
