import type { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import type { TInputProps } from '../input/input.js'

/** A selectable option. `value` identifies it; `label` is shown and matched against the query. */
export interface TComboboxOption {
  value: string
  label: string
  disabled?: boolean | undefined
}

/** A labeled set of options rendered under a group heading. */
export interface TComboboxOptionGroup {
  label: string
  items: readonly TComboboxOption[]
}

/** Props for the combobox root. `items` is either a flat list of options or a list of groups. */
export interface TComboboxProps {
  items: readonly TComboboxOption[] | readonly TComboboxOptionGroup[]
  /** Selected option value. Pass `null` for no selection. */
  value?: string | null | undefined
  defaultValue?: string | null | undefined
  onValueChange?: ((value: string | null) => void) | undefined
  open?: boolean | undefined
  defaultOpen?: boolean | undefined
  onOpenChange?: ((open: boolean) => void) | undefined
  disabled?: boolean | undefined
  readOnly?: boolean | undefined
  required?: boolean | undefined
  name?: string | undefined
  children?: ReactNode | undefined
}

export type TComboboxInputProps = Omit<TInputProps, 'children' | 'trailingIcon'> & {
  /** Trailing controls, such as `Combobox.Clear` and `Combobox.Trigger`. */
  children?: ReactNode | undefined
}

/** Base UI props with `className` narrowed to a string, since One composes class names directly. */
type TWithStringClassName<TProps extends { className?: unknown }> = Omit<TProps, 'className'> & {
  className?: string | undefined
}

export type TComboboxTriggerProps = TWithStringClassName<
  ComponentPropsWithoutRef<typeof BaseCombobox.Trigger>
>

export type TComboboxClearProps = TWithStringClassName<
  ComponentPropsWithoutRef<typeof BaseCombobox.Clear>
>

export type TComboboxContentProps = ComponentPropsWithoutRef<'div'> & {
  side?: 'top' | 'bottom' | 'left' | 'right' | undefined
  align?: 'start' | 'center' | 'end' | undefined
  sideOffset?: number | undefined
  alignOffset?: number | undefined
}

export type TComboboxListProps = Omit<
  TWithStringClassName<ComponentPropsWithoutRef<typeof BaseCombobox.List>>,
  'children'
> & {
  /** Renders each option. Defaults to a plain item per option. */
  children?: ((option: TComboboxOption, index: number) => ReactNode) | undefined
}

export type TComboboxItemProps = TWithStringClassName<
  ComponentPropsWithoutRef<typeof BaseCombobox.Item>
>

export type TComboboxEmptyProps = ComponentPropsWithoutRef<'div'>

export type TComboboxGroupProps = TWithStringClassName<
  ComponentPropsWithoutRef<typeof BaseCombobox.Group>
>

export type TComboboxGroupLabelProps = TWithStringClassName<
  ComponentPropsWithoutRef<typeof BaseCombobox.GroupLabel>
>

export type TComboboxSeparatorProps = TWithStringClassName<
  ComponentPropsWithoutRef<typeof BaseCombobox.Separator>
>
