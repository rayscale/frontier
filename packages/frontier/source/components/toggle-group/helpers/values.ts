export function hasEmptyValue(value: string | null | readonly string[] | undefined): boolean {
  return value === '' || (Array.isArray(value) && value.includes(''))
}
