/** One radius token names. */
export type TRadiusToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

const radiusTokens: ReadonlySet<string> = new Set<TRadiusToken>([
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  'full',
])

/**
 * Converts a radius token name to its CSS variable, a number to pixels, and
 * passes any other string through as CSS.
 */
export function resolveRadius(
  radius: TRadiusToken | number | (string & NonNullable<unknown>) | undefined,
): string | undefined {
  if (radius === undefined) {
    return undefined
  }

  if (typeof radius === 'number') {
    return `${String(radius)}px`
  }

  if (radiusTokens.has(radius)) {
    return `var(--frontier-radius-${radius})`
  }

  return radius
}
