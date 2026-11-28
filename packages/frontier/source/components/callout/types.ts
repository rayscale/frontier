import type { HTMLAttributes, ReactNode } from 'react'

/** Tone of the callout, mapped to the semantic color tokens. */
export type TCalloutTone = 'info' | 'success' | 'warning' | 'danger'

/** Accessible role of the callout. Defaults to `note`. */
export type TCalloutRole = 'note' | 'alert' | 'status'

export type TCalloutProps = HTMLAttributes<HTMLDivElement> & {
  /** Semantic tone of the message. Defaults to `info`. */
  tone?: TCalloutTone | undefined
  /** Accessible role. Use `alert` only for urgent, time-sensitive messages. */
  role?: TCalloutRole | undefined
  /**
   * Shows a button that dismisses the message, and calls this when it is pressed. The callout does
   * not hide itself: remove it in the handler.
   */
  onDismiss?: (() => void) | undefined
  /** Name of the dismiss button. Defaults to `Dismiss`. */
  dismissLabel?: string | undefined
  children?: ReactNode | undefined
}

export type TCalloutIconProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode | undefined
}

export type TCalloutContentProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode | undefined
}

export type TCalloutTitleProps = HTMLAttributes<HTMLElement> & {
  /** Element to render. Defaults to `p`. */
  as?: 'p' | 'div' | 'h2' | 'h3' | 'h4' | undefined
  children?: ReactNode | undefined
}

export type TCalloutActionsProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode | undefined
}
