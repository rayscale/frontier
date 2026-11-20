import type { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import type { TDialogSize } from '../dialog/dialog.js'
import type { TInputProps } from '../input/input.js'

/** A runnable command. `value` identifies it; `label` is shown and matched against the query. */
export interface TCommandItem {
  value: string
  label: string
  /** Secondary text shown below the label and matched against the query. */
  description?: string | undefined
  /** Extra search terms that match the query without being displayed. */
  keywords?: readonly string[] | undefined
  /** Symbol shown before the label. Decorative, so it is hidden from assistive technology. */
  symbol?: ReactNode | undefined
  /** Key labels shown after the item, for example `['⌘', 'S']`. */
  shortcut?: readonly string[] | undefined
  disabled?: boolean | undefined
  /** Runs when the item is chosen. Chosen items close a `Command.Dialog` before this runs. */
  onSelect?: (() => void | Promise<void>) | undefined
}

/** A labeled set of commands rendered under a group heading. */
export interface TCommandGroup {
  label: string
  items: readonly TCommandItem[]
}

/** Decides whether an item matches the current query. Return `true` to show the item. */
export type TCommandFilter = (item: TCommandItem, query: string) => boolean

/** Props for the inline `Command` root. `items` is either a flat list or a list of groups. */
export interface TCommandProps {
  items: readonly TCommandItem[] | readonly TCommandGroup[]
  /** Replaces the default filter, which requires every whitespace-separated term to match. */
  filter?: TCommandFilter | undefined
  children?: ReactNode | undefined
}

/** Props for `Command.Dialog`, a modal command palette. */
export type TCommandDialogProps = TCommandProps & {
  /** Controlled open state. Omit to let the palette manage its own state. */
  open?: boolean | undefined
  /** Initial open state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean | undefined
  /** Called with the requested open state when the palette opens or closes. */
  onOpenChange?: ((open: boolean) => void) | undefined
  /**
   * Keyboard shortcut that toggles the palette, such as `'Mod+K'`. `Mod` is Command on
   * macOS and Control elsewhere. Pass `null` to disable it. Defaults to `'Mod+K'`.
   */
  shortcut?: string | null | undefined
  /** Accessible name of the palette. Defaults to `'Command palette'`. */
  label?: string | undefined
  /** Width of the palette. Defaults to `medium`. */
  size?: TDialogSize | undefined
}

export type TCommandInputProps = Omit<
  TInputProps,
  | 'children'
  | 'label'
  | 'description'
  | 'error'
  | 'invalid'
  | 'leadingSymbol'
  | 'trailingSymbol'
  | 'trailingSymbolInteractive'
>

/** Base UI props with `className` narrowed to a string, since One composes class names directly. */
type TWithStringClassName<TProps extends { className?: unknown }> = Omit<TProps, 'className'> & {
  className?: string | undefined
}

export type TCommandListProps = Omit<
  TWithStringClassName<ComponentPropsWithoutRef<typeof BaseAutocomplete.List>>,
  'children'
> & {
  /** Renders each item. Defaults to a `Command.Item` per command. */
  children?: ((item: TCommandItem, index: number) => ReactNode) | undefined
}

export type TCommandItemProps = Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'onClick'> & {
  item: TCommandItem
}

export type TCommandEmptyProps = ComponentPropsWithoutRef<'div'>

export type TCommandGroupProps = TWithStringClassName<
  ComponentPropsWithoutRef<typeof BaseAutocomplete.Group>
>

export type TCommandGroupLabelProps = TWithStringClassName<
  ComponentPropsWithoutRef<typeof BaseAutocomplete.GroupLabel>
>

export type TCommandSeparatorProps = TWithStringClassName<
  ComponentPropsWithoutRef<typeof BaseAutocomplete.Separator>
>

export type TCommandRootProps = TCommandProps & { onItemSelect?: () => void }
