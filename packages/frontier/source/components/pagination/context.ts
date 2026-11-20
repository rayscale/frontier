import { createContext, useContext } from 'react'

export interface TPaginationContextValue {
  currentPage: number
  pageCount: number
  siblingCount: number
  disabled: boolean
  goToPage: (page: number) => void
}

export const paginationContext = createContext<TPaginationContextValue | null>(null)

export function usePaginationContext(part: string): TPaginationContextValue {
  const context = useContext(paginationContext)
  if (!context) {
    throw new Error(`Pagination.${part} must be rendered inside Pagination.`)
  }

  return context
}
