export function toCssLength(value: number | string): string {
  return typeof value === 'number' ? `${String(value)}px` : value
}
