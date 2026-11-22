import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { forwardRef } from 'react'

import { ChevronDown, X } from '../../../icons/index.js'
import { classNames } from '../../../internal/helpers/class-names.js'
import type { TComboboxClearProps, TComboboxTriggerProps } from '../types.js'

export const ComboboxTrigger = forwardRef<HTMLButtonElement, TComboboxTriggerProps>(
  function ComboboxTrigger({ children, className, ...props }, ref) {
    return (
      <BaseCombobox.Trigger
        ref={ref}
        className={classNames('frontier-combobox__trigger', className)}
        aria-label={props['aria-label'] ?? 'Show options'}
        {...props}
      >
        {children ?? <ChevronDown size={16} aria-hidden="true" />}
      </BaseCombobox.Trigger>
    )
  },
)

export const ComboboxClear = forwardRef<HTMLButtonElement, TComboboxClearProps>(
  function ComboboxClear({ children, className, ...props }, ref) {
    return (
      <BaseCombobox.Clear
        ref={ref}
        className={classNames('frontier-combobox__clear', className)}
        aria-label={props['aria-label'] ?? 'Clear selection'}
        {...props}
      >
        {children ?? <X size={16} aria-hidden="true" />}
      </BaseCombobox.Clear>
    )
  },
)
