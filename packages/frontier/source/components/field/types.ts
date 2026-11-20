import type { ComponentProps, InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react'

export type TFieldRootProps = Omit<ComponentProps<'div'>, 'children'> & {
  children: ReactNode
  /** Prevents edits while keeping the control focusable and readable. */
  disabled?: boolean
  /** Id for the control; the label, description, and error ids derive from it. */
  id?: string | undefined
  /** Marks the control invalid and shows the invalid styling. */
  invalid?: boolean
  /** Shows the required marker and marks the control required. */
  required?: boolean
}

export type TFieldLabelProps = LabelHTMLAttributes<HTMLLabelElement>

export type TFieldBoxProps = ComponentProps<'span'>

export type TFieldControlProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'disabled'> & {
  /** Prevents edits while keeping the control focusable and readable. */
  disabled?: boolean
}

export type TFieldDescriptionProps = ComponentProps<'span'>

export type TFieldErrorProps = ComponentProps<'span'>

export type TFieldIconProps = ComponentProps<'span'> & {
  /** Keeps the content available to assistive technology, for icons that act as controls. */
  interactive?: boolean
}
