import type { HTMLAttributes, ReactNode } from 'react'

/** One choice in the list that a trigger opens. */
export interface TMentionItem {
  /** Tells the item apart from the others. */
  id: string
  /** Name of the item. It is what people search and what the chip says, after the trigger. */
  label: string
  /** A second line under the label, such as an email or what a command does. */
  description?: ReactNode | undefined
  /** Shown before the label, such as an avatar. It is decorative. */
  icon?: ReactNode | undefined
  /** The text of the chip instead of the trigger and the label. */
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
  /** Adds a space after the chip. Defaults to `true`. */
  insertSpace?: boolean | undefined
  /** Name of the list for assistive technology, such as `People`. */
  label?: string | undefined
}

/** A chip that is in the text. */
export interface TMentionValue {
  /** The `id` of the item that the chip stands for. */
  id: string
  /** The text of the chip. */
  text: string
  /** The trigger that opened the list it was chosen from. */
  trigger: string
}

/** What `onValueChange` receives next to the text. */
export interface TMentionDetails {
  /** The chips in the text, in the order they appear. */
  mentions: readonly TMentionValue[]
}

/** Props for the {@link Mentions} component. */
export interface TMentionsProps {
  /** The triggers, each with its own list. */
  triggers: readonly TMentionTrigger[]
  /** Name of the field for assistive technology, when it has no `label`. */
  'aria-label'?: string | undefined
  /** Class for the field. */
  className?: string | undefined
  /**
   * Text at the start, in uncontrolled mode. The words that are the text of an item become chips.
   */
  defaultValue?: string | undefined
  /** Helper text associated with the field for assistive technologies. */
  description?: ReactNode | undefined
  /** Stops people from using the field. */
  disabled?: boolean | undefined
  /** Error message associated with the field; also marks it as invalid. */
  error?: ReactNode | undefined
  /** Controls that sit under the text, inside the field, such as a send button. */
  footer?: ReactNode | undefined
  /** Id of the editable element. */
  id?: string | undefined
  /** Marks the field as invalid even when no error is displayed. */
  invalid?: boolean | undefined
  /** Visible label of the field. */
  label?: ReactNode | undefined
  /** Name of the field, so the text is sent with a form. */
  name?: string | undefined
  /** Called with keys the list does not use. Check `defaultPrevented` before using one. */
  onKeyDown?: HTMLAttributes<HTMLDivElement>['onKeyDown']
  /** Called with the text that people typed after a trigger, each time it changes. */
  onQueryChange?: ((query: string, trigger: string) => void) | undefined
  /** Called with the item that people chose, and the trigger that opened the list. */
  onSelect?: ((item: TMentionItem, trigger: string) => void) | undefined
  /**
   * Called when people press Enter without Shift. With it, Enter adds no line, so people send a
   * message with Enter and start a new line with Shift and Enter.
   */
  onSubmit?: (() => void) | undefined
  /** Called with the text, and the chips in it, every time they change. */
  onValueChange?: ((value: string, details: TMentionDetails) => void) | undefined
  /** Text shown while the field is empty. */
  placeholder?: string | undefined
  /** Lets people read the text but not change it. */
  readOnly?: boolean | undefined
  /** Lines the field is tall before it grows. Defaults to `3`. */
  rows?: number | undefined
  /** Keeps the text in one line, so Enter adds no line. */
  singleLine?: boolean | undefined
  /** Text in controlled mode. */
  value?: string | undefined
}
