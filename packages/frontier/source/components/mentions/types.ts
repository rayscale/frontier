import type { ReactElement, ReactNode } from 'react'

/** One choice in the list that a trigger opens. */
export interface TMentionItem {
  /** Tells the item apart from the others. */
  id: string
  /** Name of the item. It is what people search and what is inserted, after the trigger. */
  label: string
  /** A second line under the label, such as an email or what a command does. */
  description?: ReactNode | undefined
  /** Shown before the label, such as an avatar. It is decorative. */
  icon?: ReactNode | undefined
  /** The text to insert instead of the trigger and the label. */
  insert?: string | undefined
  /** Keeps people from choosing the item. */
  disabled?: boolean | undefined
}

/** A character that opens a list of choices when people type it, such as `@` or `/`. */
export interface TMentionTrigger {
  /** The text that opens the list. It must come at the start of a word. */
  char: string
  /** The choices. */
  items: readonly TMentionItem[]
  /** Opens the list only when the trigger is the first thing in the field, as `/` does for commands. */
  atStart?: boolean | undefined
  /**
   * Decides which items match what people typed. Defaults to a search of the label that ignores
   * case. Pass `false` to show the items as they are, when they come from a search of your own.
   */
  filter?: false | ((item: TMentionItem, query: string) => boolean) | undefined
  /** Adds a space after the inserted text. Defaults to `true`. */
  insertSpace?: boolean | undefined
  /** Name of the list for assistive technology, such as `People`. */
  label?: string | undefined
}

/** Props for the {@link Mentions} component. */
export interface TMentionsProps {
  /** The text field to watch. It can be a `Textarea`, an `Input`, or the field of an `InputGroup`. */
  children: ReactElement
  /** The triggers, each with its own list. */
  triggers: readonly TMentionTrigger[]
  /** Called with the text that people typed after a trigger, each time it changes. */
  onQueryChange?: ((query: string, trigger: string) => void) | undefined
  /** Called with the item that people chose, and the trigger that opened the list. */
  onSelect?: ((item: TMentionItem, trigger: string) => void) | undefined
}
