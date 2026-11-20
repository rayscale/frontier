import { createContext, useContext } from 'react'

export interface TAvatarContextValue {
  activeSource: string | null
  loadedSource: string | null
  setLoadedSource: (source: string | null) => void
}

export const avatarContext = createContext<TAvatarContextValue | null>(null)

export function useAvatarContext(): TAvatarContextValue {
  const context = useContext(avatarContext)

  if (!context) {
    throw new Error('Avatar.Image and Avatar.Fallback must be used within Avatar.')
  }

  return context
}
