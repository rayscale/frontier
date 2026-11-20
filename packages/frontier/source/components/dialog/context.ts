import { createContext, type RefObject, useContext } from 'react'

export interface TDialogContextValue {
  closeOnBackdropClickRef: RefObject<boolean>
}

export const dialogContext = createContext<TDialogContextValue | null>(null)

export function useDialogContext(componentName: string): TDialogContextValue {
  const context = useContext(dialogContext)

  if (!context) {
    throw new Error(`${componentName} must be used within Dialog.`)
  }

  return context
}
