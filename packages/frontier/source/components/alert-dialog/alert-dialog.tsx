import { forwardRef, type ReactElement, useRef } from 'react'

import { Dialog } from '../dialog/dialog.js'

import type {
  TAlertDialogActionProps,
  TAlertDialogCancelProps,
  TAlertDialogContentProps,
  TAlertDialogProps,
} from './types.js'

export type {
  TAlertDialogActionProps,
  TAlertDialogCancelProps,
  TAlertDialogContentProps,
  TAlertDialogDescriptionProps,
  TAlertDialogFooterProps,
  TAlertDialogHeaderProps,
  TAlertDialogProps,
  TAlertDialogTitleProps,
  TAlertDialogTriggerProps,
} from './types.js'

const cancelAttribute = 'data-frontier-alert-dialog-cancel'

function AlertDialogRoot(props: TAlertDialogProps): ReactElement {
  return <Dialog {...props} />
}

const AlertDialogContent = forwardRef<HTMLDivElement, TAlertDialogContentProps>(
  function AlertDialogContent({ size = 'small', ...props }, ref) {
    const popupRef = useRef<HTMLDivElement | null>(null)

    return (
      <Dialog.Content
        {...props}
        ref={(node) => {
          popupRef.current = node

          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        closeOnBackdropClick={false}
        // The focus starts on the cancel, so that pressing Enter by reflex does not confirm.
        initialFocus={() =>
          popupRef.current?.querySelector<HTMLElement>(`[${cancelAttribute}]`) ?? null
        }
        role="alertdialog"
        showCloseButton={false}
        size={size}
      />
    )
  },
)

function AlertDialogCancel(props: TAlertDialogCancelProps): ReactElement {
  return <Dialog.Close {...{ [cancelAttribute]: '' }} {...props} />
}

function AlertDialogAction({
  variant = 'primary',
  ...props
}: TAlertDialogActionProps): ReactElement {
  return <Dialog.Close {...props} variant={variant} />
}

export interface TAlertDialogComponent {
  (props: TAlertDialogProps): ReactElement
  /** Renders the element that opens the dialog. */
  Trigger: typeof Dialog.Trigger
  /** Renders the dialog. People cannot dismiss it by pressing outside it. */
  Content: typeof AlertDialogContent
  /** Contains the title and the description. */
  Header: typeof Dialog.Header
  /** Renders the title, which names the dialog. */
  Title: typeof Dialog.Title
  /** Renders the description, which says what will happen. */
  Description: typeof Dialog.Description
  /** Lays out the cancel and the action. */
  Footer: typeof Dialog.Footer
  /** A button that closes the dialog without doing anything. It takes the focus first. */
  Cancel: typeof AlertDialogCancel
  /** A button that confirms. It closes the dialog unless `onClick` calls `preventDefault`. */
  Action: typeof AlertDialogAction
}

/**
 * Asks people to confirm something before it happens, such as deleting data, and does not let them
 * dismiss the question by accident. Compose it with `AlertDialog.Trigger`, `AlertDialog.Content`,
 * `AlertDialog.Header`, `AlertDialog.Title`, `AlertDialog.Description`, `AlertDialog.Footer`,
 * `AlertDialog.Cancel`, and `AlertDialog.Action`. It is built on `Dialog`.
 */
export const AlertDialog: TAlertDialogComponent = Object.assign(AlertDialogRoot, {
  Trigger: Dialog.Trigger,
  Content: AlertDialogContent,
  Header: Dialog.Header,
  Title: Dialog.Title,
  Description: Dialog.Description,
  Footer: Dialog.Footer,
  Cancel: AlertDialogCancel,
  Action: AlertDialogAction,
})
