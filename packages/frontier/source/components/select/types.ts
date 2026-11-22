import type { Select as BaseSelect } from '@base-ui/react/select'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import type { TFloatingPlacement } from '../../internal/primitives/floating-popup/floating-popup.js'

/** Props for the select root. Options are declared as `Select.Item` children. */
export interface TSelectProps {
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
  /** Field name used when the select is submitted with a form. */
  name?: string | undefined
  children?: ReactNode | undefined
}

/** Base UI props with `className` narrowed to a string, since One composes class names directly. */
type TWithStringClassName<TProps extends { className?: unknown }> = Omit<TProps, 'className'> & {
  className?: string | undefined
}

export type TSelectLabelProps = TWithStringClassName<
  ComponentPropsWithoutRef<typeof BaseSelect.Label>
>

export type TSelectTriggerProps = TWithStringClassName<
  ComponentPropsWithoutRef<typeof BaseSelect.Trigger>
>

export type TSelectValueProps = TWithStringClassName<
  ComponentPropsWithoutRef<typeof BaseSelect.Value>
>

export type TSelectIconProps = TWithStringClassName<
  ComponentPropsWithoutRef<typeof BaseSelect.Icon>
>

export type TSelectContentProps = ComponentPropsWithoutRef<'div'> & TFloatingPlacement

export type TSelectListProps = TWithStringClassName<
  ComponentPropsWithoutRef<typeof BaseSelect.List>
>

export type TSelectItemProps = TWithStringClassName<
  ComponentPropsWithoutRef<typeof BaseSelect.Item>
>

export type TSelectGroupProps = TWithStringClassName<
  ComponentPropsWithoutRef<typeof BaseSelect.Group>
>

export type TSelectGroupLabelProps = TWithStringClassName<
  ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel>
>

export type TSelectSeparatorProps = TWithStringClassName<
  ComponentPropsWithoutRef<typeof BaseSelect.Separator>
>
