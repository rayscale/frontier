import type { TMentionItem, TMentionTrigger } from '../types.js'

/** The trigger that people are typing after, and what they typed since. */
export interface TMentionMatch {
  /** Where the trigger starts in the text. */
  readonly start: number
  /** What people typed after the trigger. */
  readonly query: string
  /** Position of the trigger in the list of triggers. */
  readonly triggerIndex: number
}

const whitespace = /\s/

/** Finds the trigger at the start of the word that the cursor is in, if there is one. */
export function findMention(
  value: string,
  caret: number,
  triggers: readonly TMentionTrigger[],
): TMentionMatch | null {
  let start = caret
  while (start > 0 && !whitespace.test(value.charAt(start - 1))) {
    start -= 1
  }

  const word = value.slice(start, caret)
  const triggerIndex = triggers.findIndex(
    (trigger) =>
      trigger.char.length > 0 &&
      word.startsWith(trigger.char) &&
      (trigger.atStart !== true || value.slice(0, start).trim() === ''),
  )
  const trigger = triggers[triggerIndex]
  if (!trigger) {
    return null
  }

  return { start, query: word.slice(trigger.char.length), triggerIndex }
}

export function isSameMatch(first: TMentionMatch | null, second: TMentionMatch | null): boolean {
  return (
    first?.start === second?.start &&
    first?.query === second?.query &&
    first?.triggerIndex === second?.triggerIndex
  )
}

/** The items that match what people typed. */
export function filterItems(trigger: TMentionTrigger, query: string): readonly TMentionItem[] {
  if (trigger.filter === false) {
    return trigger.items
  }

  const matches =
    trigger.filter ??
    ((item: TMentionItem, text: string) => item.label.toLowerCase().includes(text.toLowerCase()))

  return trigger.items.filter((item) => matches(item, query))
}

/** The position of the next item that people can choose, going around the list. */
export function getNextIndex(
  items: readonly TMentionItem[],
  from: number,
  direction: 1 | -1,
): number {
  for (let step = 1; step <= items.length; step += 1) {
    const index = (from + direction * step + items.length * step) % items.length
    if (items[index]?.disabled !== true) {
      return index
    }
  }

  return from
}
