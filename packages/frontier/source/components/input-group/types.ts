import type {
  ComponentPropsWithoutRef,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react'

/** Side of the group an addon is attached to. */
export type TInputGroupAlign = 'start' | 'end' | 'top' | 'bottom'

/**
 * Props for the group: one bordered box that holds a field and the controls around it, with an
 * optional label, description, and error. Native attributes and the ref apply to the box.
 */
export type TInputGroupRootProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  children?: ReactNode | undefined
  /** Helper text associated with the field for assistive technologies. */
  description?: ReactNode | undefined
  /** Prevents typing in the field and marks the whole group as unavailable. */
  disabled?: boolean | undefined
  /** Error message associated with the field; also marks it as invalid. */
  error?: ReactNode | undefined
  /** Marks the field as invalid even when no error is displayed. */
  invalid?: boolean | undefined
  /** Visible label associated with the field. */
  label?: ReactNode | undefined
  /** Lets people select the text of the field but not change it. */
  readOnly?: boolean | undefined
}

/** Props for the single-line field inside a group. */
export type TInputGroupInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'disabled' | 'id' | 'readOnly'
>

/** Props for the multi-line field inside a group. */
export type TInputGroupTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'disabled' | 'id' | 'readOnly'
> & {
  /**
   * Grows and shrinks the field with its content instead of scrolling or resizing by hand.
   * Needs `field-sizing` support; without it the field keeps `rows`. Defaults to `true`.
   */
  autoSize?: boolean | undefined
}

/** Props for a strip of content attached to one side of the field. */
export type TInputGroupAddonProps = ComponentPropsWithoutRef<'div'> & {
  /**
   * Side the addon is attached to. `start` and `end` sit beside the field and `top` and `bottom`
   * take a full row above or below it. Defaults to `start`.
   */
  align?: TInputGroupAlign | undefined
}

/** Props for static text inside an addon. */
export type TInputGroupTextProps = ComponentPropsWithoutRef<'span'>
