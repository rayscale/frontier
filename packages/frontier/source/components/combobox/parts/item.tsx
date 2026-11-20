import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { forwardRef } from 'react'

import { Check } from '../../../icons/index.js'
import { classNames } from '../../../internal/helpers/class-names.js'
import type {
  TComboboxGroupLabelProps,
  TComboboxGroupProps,
  TComboboxItemProps,
  TComboboxSeparatorProps,
} from '../types.js'

export const ComboboxItem = forwardRef<HTMLDivElement, TComboboxItemProps>(function ComboboxItem(
  { className, children, ...props },
  ref,
) {
  return (
    <BaseCombobox.Item
      ref={ref}
      className={classNames('frontier-combobox__item', className)}
      {...props}
    >
      <span className="frontier-combobox__item-text">{children}</span>
      <BaseCombobox.ItemIndicator className="frontier-combobox__item-indicator">
        <Check size={16} aria-hidden="true" />
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  )
})

export const ComboboxGroup = forwardRef<HTMLDivElement, TComboboxGroupProps>(function ComboboxGroup(
  { className, ...props },
  ref,
) {
  return (
    <BaseCombobox.Group
      ref={ref}
      className={classNames('frontier-combobox__group', className)}
      {...props}
    />
  )
})

export const ComboboxGroupLabel = forwardRef<HTMLDivElement, TComboboxGroupLabelProps>(
  function ComboboxGroupLabel({ className, ...props }, ref) {
    return (
      <BaseCombobox.GroupLabel
        ref={ref}
        className={classNames('frontier-combobox__group-label', className)}
        {...props}
      />
    )
  },
)

export const ComboboxSeparator = forwardRef<HTMLDivElement, TComboboxSeparatorProps>(
  function ComboboxSeparator({ className, ...props }, ref) {
    return (
      <BaseCombobox.Separator
        ref={ref}
        className={classNames('frontier-combobox__separator', className)}
        {...props}
      />
    )
  },
)
