import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from 'react'

/** Props for {@link Collapsible}, in addition to native `div` attributes. */
export type TCollapsibleProps = HTMLAttributes<HTMLDivElement> & {
  /** Trigger and content of the collapsible. */
  children?: ReactNode | undefined
  /** Expanded state for controlled use. Omit it to let the component manage its own state. */
  open?: boolean | undefined
  /** Expanded state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean | undefined
  /** Called with the new expanded state whenever the trigger opens or closes the content. */
  onOpenChange?: ((open: boolean) => void) | undefined
  /** Prevents the trigger from opening or closing the content. Defaults to `false`. */
  disabled?: boolean | undefined
}

/** Props for {@link CollapsibleTrigger}, in addition to native `button` attributes. */
export type TCollapsibleTriggerProps = ComponentPropsWithoutRef<'button'>

/** Props for {@link CollapsibleContent}, in addition to native `div` attributes. */
export type TCollapsibleContentProps = HTMLAttributes<HTMLDivElement>
