import { Select as BaseSelect } from '@base-ui/react/select'
import { forwardRef } from 'react'

import { ChevronDown } from '../../../icons/index.js'
import { classNames } from '../../../internal/helpers/class-names.js'
import { AutoSize } from '../../../internal/primitives/auto-size/auto-size.js'
import type {
  TSelectIconProps,
  TSelectLabelProps,
  TSelectTriggerProps,
  TSelectValueProps,
} from '../types.js'

export const SelectLabel = forwardRef<HTMLDivElement, TSelectLabelProps>(function SelectLabel(
  { className, ...props },
  ref,
) {
  return (
    <BaseSelect.Label
      ref={ref}
      className={classNames('frontier-select__label', className)}
      {...props}
    />
  )
})

export const SelectTrigger = forwardRef<HTMLButtonElement, TSelectTriggerProps>(
  function SelectTrigger({ className, ...props }, ref) {
    return (
      <BaseSelect.Trigger
        ref={ref}
        className={classNames('frontier-select__trigger', className)}
        {...props}
      />
    )
  },
)

export const SelectValue = forwardRef<HTMLSpanElement, TSelectValueProps>(function SelectValue(
  { className, ...props },
  ref,
) {
  return (
    <AutoSize axis="horizontal" className="frontier-select__value-container">
      <BaseSelect.Value
        ref={ref}
        className={classNames('frontier-select__value', className)}
        {...props}
      />
    </AutoSize>
  )
})

export const SelectIcon = forwardRef<HTMLSpanElement, TSelectIconProps>(function SelectIcon(
  { className, children, ...props },
  ref,
) {
  return (
    <BaseSelect.Icon
      ref={ref}
      className={classNames('frontier-select__icon', className)}
      {...props}
    >
      {children ?? <ChevronDown size={16} aria-hidden="true" />}
    </BaseSelect.Icon>
  )
})
