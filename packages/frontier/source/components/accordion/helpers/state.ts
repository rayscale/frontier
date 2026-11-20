export function toExpandedValues(value: string | readonly string[] | null | undefined): string[] {
  if (value === null || value === undefined) {
    return []
  }

  return typeof value === 'string' ? [value] : [...value]
}
