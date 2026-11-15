import type { ComponentProps, InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react'

export type TFieldRootProps = Omit<ComponentProps<'div'>, 'children'> & {
  children: ReactNode
  disabled?: boolean
  id?: string | undefined
  invalid?: boolean
  required?: boolean
}

export type TFieldLabelProps = LabelHTMLAttributes<HTMLLabelElement>

export type TFieldBoxProps = ComponentProps<'span'>

export type TFieldControlProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'disabled'> & {
  disabled?: boolean
}

export type TFieldDescriptionProps = ComponentProps<'span'>

export type TFieldErrorProps = ComponentProps<'span'>
