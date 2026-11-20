import { Select as BaseSelect } from '@base-ui/react/select'
import { forwardRef } from 'react'

import { Check } from '../../../icons/index.js'
import { classNames } from '../../../internal/helpers/class-names.js'
import type {
  TSelectGroupLabelProps,
  TSelectGroupProps,
  TSelectItemProps,
  TSelectSeparatorProps,
} from '../types.js'

export const SelectItem = forwardRef<HTMLDivElement, TSelectItemProps>(function SelectItem(
  { className, children, ...props },
  ref,
) {
  return (
    <BaseSelect.Item
      ref={ref}
      className={classNames('frontier-select__item', className)}
      {...props}
    >
      <BaseSelect.ItemText className="frontier-select__item-text">{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className="frontier-select__item-indicator">
        <Check size={16} aria-hidden="true" />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  )
})

export const SelectGroup = forwardRef<HTMLDivElement, TSelectGroupProps>(function SelectGroup(
  { className, ...props },
  ref,
) {
  return (
    <BaseSelect.Group
      ref={ref}
      className={classNames('frontier-select__group', className)}
      {...props}
    />
  )
})

export const SelectGroupLabel = forwardRef<HTMLDivElement, TSelectGroupLabelProps>(
  function SelectGroupLabel({ className, ...props }, ref) {
    return (
      <BaseSelect.GroupLabel
        ref={ref}
        className={classNames('frontier-select__group-label', className)}
        {...props}
      />
    )
  },
)

export const SelectSeparator = forwardRef<HTMLDivElement, TSelectSeparatorProps>(
  function SelectSeparator({ className, ...props }, ref) {
    return (
      <BaseSelect.Separator
        ref={ref}
        className={classNames('frontier-select__separator', className)}
        {...props}
      />
    )
  },
)
