import { type Context, createContext, useContext } from 'react'

export interface TRadioGroupContext {
  name: string
  onSelect: (value: string) => void
  required: boolean
  selectedValue: string | undefined
}

export const radioGroupContext: Context<TRadioGroupContext | null> =
  createContext<TRadioGroupContext | null>(null)

export function useRadioGroupContext(): TRadioGroupContext {
  const context = useContext(radioGroupContext)

  if (!context) {
    throw new Error('RadioGroup.Item must be rendered inside RadioGroup.')
  }

  return context
}
