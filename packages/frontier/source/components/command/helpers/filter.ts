import type { TCommandGroup, TCommandItem, TCommandProps } from '../types.js'

export function isCommandGroup(entry: TCommandItem | TCommandGroup): entry is TCommandGroup {
  return 'items' in entry
}

export function isGroupedCommandList(
  items: TCommandProps['items'],
): items is readonly TCommandGroup[] {
  const [first] = items

  return first !== undefined && isCommandGroup(first)
}

/**
 * Default filter. Every whitespace-separated term of the query must appear in the
 * label, description, or keywords, ignoring case.
 */
export function matchesCommandQuery(item: TCommandItem, query: string): boolean {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)

  if (terms.length === 0) {
    return true
  }

  const searchableText = [item.label, item.description, ...(item.keywords ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return terms.every((term) => searchableText.includes(term))
}
