import { type Context, createContext, useContext } from 'react'

export interface TFieldContext {
  controlId: string
  descriptionId: string
  disabled: boolean
  errorId: string
  invalid: boolean
  required: boolean
}

export const fieldContext: Context<TFieldContext | null> = createContext<TFieldContext | null>(null)

export function useFieldContext(): TFieldContext | null {
  return useContext(fieldContext)
}
