import { createContext, useContext } from 'react'

export interface TCheckboxGroupContextValue {
  selectedValues: readonly string[]
  disabled: boolean
  onToggle: (value: string, checked: boolean) => void
}

export const checkboxGroupContext = createContext<TCheckboxGroupContextValue | null>(null)

export function useCheckboxGroupContext(): TCheckboxGroupContextValue {
  const context = useContext(checkboxGroupContext)

  if (!context) {
    throw new Error('CheckboxGroup.Item must be rendered inside a CheckboxGroup.')
  }

  return context
}
