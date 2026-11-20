import { createContext, useContext } from 'react'

export interface TRadioGroupContextValue {
  name: string
  selectedValue: string | undefined
  disabled: boolean
  required: boolean
  onSelect: (value: string) => void
}

export const radioGroupContext = createContext<TRadioGroupContextValue | null>(null)

export function useRadioGroupContext(componentName: string): TRadioGroupContextValue {
  const context = useContext(radioGroupContext)

  if (!context) {
    throw new Error(`${componentName} must be rendered inside a RadioGroup.`)
  }

  return context
}
