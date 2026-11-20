import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { Children, forwardRef, isValidElement, type ReactNode, useLayoutEffect } from 'react'

import { X } from '../../../icons/index.js'
import { Button } from '../../button/button.js'
import { useDrawerContext } from '../context.js'
import { useDrawerPopupRegistration } from '../hooks/use-drawer-stack.js'
import type { TDrawerContentProps } from '../types.js'

import { DrawerFooter, DrawerHeader } from './sections.js'

/**
 * Separates `Drawer.Header` and `Drawer.Footer` from the remaining content, so
 * they stay outside the scroll container wherever a consumer places them.
 */
function partitionDrawerChildren(children: ReactNode) {
  const headers: ReactNode[] = []
  const body: ReactNode[] = []
  const footers: ReactNode[] = []

  for (const child of Children.toArray(children)) {
    if (isValidElement(child) && child.type === DrawerHeader) {
      headers.push(child)
    } else if (isValidElement(child) && child.type === DrawerFooter) {
      footers.push(child)
    } else {
      body.push(child)
    }
  }

  return { headers, body, footers }
}

export const DrawerContent = forwardRef<HTMLDivElement, TDrawerContentProps>(function DrawerContent(
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
  const { closeOnBackdropClickRef, side, stackEntry } = useDrawerContext('Drawer.Content')
  useLayoutEffect(() => {
    closeOnBackdropClickRef.current = closeOnBackdropClick
  }, [closeOnBackdropClick, closeOnBackdropClickRef])

  const setPopupElement = useDrawerPopupRegistration(stackEntry, ref)

  const classes = [
    'frontier-drawer',
    `frontier-drawer--${side}`,
    `frontier-drawer--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const { headers, body, footers } = partitionDrawerChildren(children)
  const closeButton = showCloseButton ? (
    <BaseDrawer.Close
      render={
        <Button
          variant="ghost"
          size="icon"
          className="frontier-drawer__close-button"
          aria-label="Close drawer"
        />
      }
    >
      <X aria-hidden="true" />
    </BaseDrawer.Close>
  ) : null

  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop className="frontier-drawer__backdrop" />
      <BaseDrawer.Viewport className="frontier-drawer__viewport">
        <BaseDrawer.Popup {...props} ref={setPopupElement} className={classes}>
          {headers}
          <BaseDrawer.Content className="frontier-drawer__body">{body}</BaseDrawer.Content>
          {footers}
          {headers.length > 0
            ? closeButton
            : closeButton && <div className="frontier-drawer__toolbar">{closeButton}</div>}
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  )
})
