import type { ReactNode } from 'react'

export function itemKey(item: ReactNode, index: number): string | number {
  return item !== null && typeof item === 'object' && 'key' in item && item.key !== null
    ? item.key
    : index
}
