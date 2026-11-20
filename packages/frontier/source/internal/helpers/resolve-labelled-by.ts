/** Builds the `aria-labelledby` value for a trigger that shows a value next to its label. */
export function resolveLabelledBy(
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
  labelId: string,
  valueId: string,
): string | undefined {
  if (ariaLabel) {
    return `${labelId} ${valueId}`
  }

  return ariaLabelledBy ? `${ariaLabelledBy} ${valueId}` : undefined
}
