import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import type { ReactElement } from 'react'

import { withConsumerClick } from '../../../internal/helpers/with-consumer-click.js'
import { Button } from '../../button/button.js'
import { useDrawerContext } from '../context.js'
import type {
  TDrawerCloseProps,
  TDrawerDescriptionProps,
  TDrawerFooterProps,
  TDrawerHeaderProps,
  TDrawerTitleProps,
} from '../types.js'

export function DrawerHeader({ className, ...props }: TDrawerHeaderProps): ReactElement {
  return (
    <div {...props} className={['frontier-drawer__header', className].filter(Boolean).join(' ')} />
  )
}

export function DrawerTitle({ className, ...props }: TDrawerTitleProps): ReactElement {
  useDrawerContext('Drawer.Title')

  return (
    <BaseDrawer.Title
      {...props}
      className={['frontier-drawer__title', className].filter(Boolean).join(' ')}
    />
  )
}

export function DrawerDescription({ className, ...props }: TDrawerDescriptionProps): ReactElement {
  useDrawerContext('Drawer.Description')

  return (
    <BaseDrawer.Description
      {...props}
      className={['frontier-drawer__description', className].filter(Boolean).join(' ')}
    />
  )
}

export function DrawerFooter({ className, ...props }: TDrawerFooterProps): ReactElement {
  return (
    <div {...props} className={['frontier-drawer__footer', className].filter(Boolean).join(' ')} />
  )
}

export function DrawerClose({ onClick, ...props }: TDrawerCloseProps): ReactElement {
  useDrawerContext('Drawer.Close')

  return (
    <BaseDrawer.Close
      render={
        <Button variant="outline" {...props} type="button" onClick={withConsumerClick(onClick)} />
      }
    />
  )
}
