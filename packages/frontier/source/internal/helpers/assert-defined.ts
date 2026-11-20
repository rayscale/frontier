/** Returns the value, or throws when it is `null` or `undefined`. */
export function assertDefined<TValue>(
  value: TValue | null | undefined,
  message = 'Expected a value to be defined.',
): TValue {
  if (value === null || value === undefined) {
    throw new Error(message)
  }

  return value
}
