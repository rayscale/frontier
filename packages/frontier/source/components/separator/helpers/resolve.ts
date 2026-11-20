import type { TSeparatorProps } from '../types.js'

const colorTokens = new Map<string, string>([
  ['subtle', 'var(--frontier-color-border-subtle)'],
  ['default', 'var(--frontier-color-border)'],
  ['strong', 'var(--frontier-color-border-strong)'],
])

export function resolveColor(color: TSeparatorProps['color']): string | undefined {
  if (color === undefined) {
    return undefined
  }

  return colorTokens.get(color) ?? color
}

export function resolveThickness(thickness: TSeparatorProps['thickness']): string | undefined {
  if (thickness === undefined) {
    return undefined
  }

  return typeof thickness === 'number' ? `${String(thickness)}px` : thickness
}
