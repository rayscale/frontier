import { type Context, createContext, useContext } from 'react'

export interface TFieldContext {
  controlId: string
  disabled: boolean
  invalid: boolean
  registerDescription: (id: string | undefined) => void
  registerError: (id: string | undefined) => void
  required: boolean
  descriptionId?: string | undefined
  errorId?: string | undefined
}

export const fieldContext: Context<TFieldContext | null> = createContext<TFieldContext | null>(null)

export function useFieldContext(): TFieldContext | null {
  return useContext(fieldContext)
}
