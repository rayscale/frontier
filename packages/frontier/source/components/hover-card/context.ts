import { createContext } from 'react'

export interface THoverCardContextValue {
  readonly closeDelay: number
  readonly openDelay: number
}

export const hoverCardContext = createContext<THoverCardContextValue>({
  closeDelay: 200,
  openDelay: 400,
})
