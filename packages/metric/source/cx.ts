export type ClassValue = string | false | null | undefined

export function cx(...values: readonly ClassValue[]): string {
  const classes: string[] = []

  for (const value of values) {
    if (typeof value === 'string' && value.length > 0) {
      classes.push(value)
    }
  }

  return classes.join(' ')
}
