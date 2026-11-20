import type { ReactNode } from 'react'

interface TAccordionBaseProps {
  /** Accordion items, rendered with `Accordion.Item`. */
  children: ReactNode
  /** Additional CSS class for the root element. */
  className?: string | undefined
  /** Disables every item. Defaults to `false`. */
  disabled?: boolean | undefined
}

/** Props for {@link Accordion} in single mode, where at most one item is expanded. */
export type TAccordionSingleProps = TAccordionBaseProps & {
  type: 'single'
  /**
   * TValue of the expanded item, or `null` when none is expanded. Omit the
   * prop entirely to let the accordion manage its own state.
   */
  value?: string | null | undefined
  /** Expanded item in uncontrolled mode. Defaults to `null`. */
  defaultValue?: string | null | undefined
  /** Called with the value of the newly expanded item, or `null` when it collapses. */
  onValueChange?: ((value: string | null) => void) | undefined
}

/** Props for {@link Accordion} in multiple mode, where any number of items may be expanded. */
export type TAccordionMultipleProps = TAccordionBaseProps & {
  type: 'multiple'
  /** Values of the expanded items. Omit the prop to let the accordion manage its own state. */
  value?: string[] | undefined
  /** Expanded items in uncontrolled mode. Defaults to `[]`. */
  defaultValue?: string[] | undefined
  /** Called with the values of all expanded items after each change. */
  onValueChange?: ((value: string[]) => void) | undefined
}

/** Props for {@link Accordion}. */
export type TAccordionProps = TAccordionSingleProps | TAccordionMultipleProps

/** Props for `Accordion.Item`. */
export interface TAccordionItemProps {
  /** Content shown when the item is expanded. */
  children: ReactNode
  /** Trigger label. */
  title: ReactNode
  /** Stable identifier used for expansion state. */
  value: string
  /** Additional CSS class for the item element. */
  className?: string | undefined
  /** Prevents the item from being toggled. Defaults to `false`. */
  disabled?: boolean | undefined
}
