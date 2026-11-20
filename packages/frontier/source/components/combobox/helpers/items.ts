import type { TComboboxOption, TComboboxOptionGroup } from '../types.js'

export function isOptionGroup(
  entry: TComboboxOption | TComboboxOptionGroup,
): entry is TComboboxOptionGroup {
  return 'items' in entry
}
