import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { Children, forwardRef, isValidElement, type ReactNode, useLayoutEffect } from 'react'

import { X } from '../../../icons/index.js'
import { Button } from '../../button/button.js'
import { useSheetContext } from '../context.js'
import { useSheetPopupRegistration } from '../hooks/use-sheet-stack.js'
import type { TSheetContentProps } from '../types.js'

import { SheetFooter, SheetHeader } from './sections.js'

/**
 * Separates `Sheet.Header` and `Sheet.Footer` from the remaining content, so
 * they stay outside the scroll container wherever a consumer places them.
 */
function partitionSheetChildren(children: ReactNode) {
  const headers: ReactNode[] = []
  const body: ReactNode[] = []
  const footers: ReactNode[] = []

  for (const child of Children.toArray(children)) {
    if (isValidElement(child) && child.type === SheetHeader) {
      headers.push(child)
    } else if (isValidElement(child) && child.type === SheetFooter) {
      footers.push(child)
    } else {
      body.push(child)
    }
  }

  return { headers, body, footers }
}

export const SheetContent = forwardRef<HTMLDivElement, TSheetContentProps>(function SheetContent(
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
  const { closeOnBackdropClickRef, side, stackEntry } = useSheetContext('Sheet.Content')
  useLayoutEffect(() => {
    closeOnBackdropClickRef.current = closeOnBackdropClick
  }, [closeOnBackdropClick, closeOnBackdropClickRef])

  const setPopupElement = useSheetPopupRegistration(stackEntry, ref)

  const classes = [
    'frontier-sheet',
    `frontier-sheet--${side}`,
    `frontier-sheet--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const { headers, body, footers } = partitionSheetChildren(children)
  const closeButton = showCloseButton ? (
    <BaseDrawer.Close
      render={
        <Button
          variant="ghost"
          size="icon"
          className="frontier-sheet__close-button"
          aria-label="Close sheet"
        />
      }
    >
      <X aria-hidden="true" />
    </BaseDrawer.Close>
  ) : null

  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop className="frontier-sheet__backdrop" />
      <BaseDrawer.Viewport className="frontier-sheet__viewport">
        <BaseDrawer.Popup {...props} ref={setPopupElement} className={classes}>
          {headers}
          <BaseDrawer.Content className="frontier-sheet__body">{body}</BaseDrawer.Content>
          {footers}
          {headers.length > 0
            ? closeButton
            : closeButton && <div className="frontier-sheet__toolbar">{closeButton}</div>}
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  )
})
