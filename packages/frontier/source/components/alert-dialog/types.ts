import type {
  TDialogCloseProps,
  TDialogContentProps,
  TDialogDescriptionProps,
  TDialogFooterProps,
  TDialogHeaderProps,
  TDialogProps,
  TDialogTitleProps,
  TDialogTriggerProps,
} from '../dialog/dialog.js'

/** Props for the {@link AlertDialog} root component. */
export type TAlertDialogProps = TDialogProps

/** Props for `AlertDialog.Trigger`. */
export type TAlertDialogTriggerProps = TDialogTriggerProps

/**
 * Props for `AlertDialog.Content`. People cannot close the dialog by pressing the backdrop or with
 * a close button, so those props are not here: they decide with the cancel or the action.
 */
export type TAlertDialogContentProps = Omit<
  TDialogContentProps,
  'closeOnBackdropClick' | 'initialFocus' | 'role' | 'showCloseButton'
>

/** Props for `AlertDialog.Header`. */
export type TAlertDialogHeaderProps = TDialogHeaderProps

/** Props for `AlertDialog.Title`. */
export type TAlertDialogTitleProps = TDialogTitleProps

/** Props for `AlertDialog.Description`. */
export type TAlertDialogDescriptionProps = TDialogDescriptionProps

/** Props for `AlertDialog.Footer`. */
export type TAlertDialogFooterProps = TDialogFooterProps

/** Props for `AlertDialog.Cancel`. It is a button, so it takes the props of a button. */
export type TAlertDialogCancelProps = TDialogCloseProps

/**
 * Props for `AlertDialog.Action`. It is a button, so it takes the props of a button. Its `variant`
 * defaults to `primary`; use `danger` when the action destroys something.
 */
export type TAlertDialogActionProps = TDialogCloseProps
