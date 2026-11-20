import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { forwardRef, type ReactElement, useMemo } from 'react'

import { Input } from '../../input/input.js'
import type { TComboboxInputProps, TComboboxOption, TComboboxProps } from '../types.js'

export function ComboboxRoot({
  items,
  value,
  defaultValue,
  onValueChange,
  open,
  defaultOpen,
  onOpenChange,
  disabled,
  readOnly,
  required,
  name,
  children,
}: TComboboxProps): ReactElement {
  const collection = useMemo(
    () =>
      BaseCombobox.createItems<TComboboxOption, string>(items, {
        getValue: (option) => option.value,
        getLabel: (option) => option.label,
      }),
    [items],
  )

  return (
    <BaseCombobox.Root
      items={collection}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(nextValue) => onValueChange?.(nextValue)}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      name={name}
    >
      {children}
    </BaseCombobox.Root>
  )
}

export const ComboboxInput = forwardRef<HTMLInputElement, TComboboxInputProps>(
  function ComboboxInput(
    { children, className, description, error, invalid, label, leadingSymbol, ...props },
    ref,
  ) {
    return (
      <BaseCombobox.Input
        ref={ref}
        className={className}
        render={
          <Input
            description={description}
            error={error}
            invalid={invalid}
            label={label}
            leadingSymbol={leadingSymbol}
            trailingSymbol={children}
            trailingSymbolInteractive
          />
        }
        {...props}
      />
    )
  },
)
