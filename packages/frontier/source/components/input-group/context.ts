import { createContext, useContext } from 'react'

export interface TinputGroupContext {
  readonly controlId: string
  readonly describedBy: string | undefined
  readonly disabled: boolean
  readonly errorMessage: string | undefined
  readonly invalid: boolean
  readonly readOnly: boolean
}

export const inputGroupContext = createContext<TinputGroupContext | null>(null)

export function useInputGroup(): TinputGroupContext {
  const context = useContext(inputGroupContext)

  if (!context) {
    throw new Error('InputGroup parts must be rendered inside InputGroup.')
  }

  return context
}
