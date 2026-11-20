import { SelectGroup, SelectGroupLabel, SelectItem, SelectSeparator } from './parts/item.js'
import { SelectContent, SelectList } from './parts/popup.js'
import { SelectRoot } from './parts/root.js'
import { SelectLabel, SelectSymbol, SelectTrigger, SelectValue } from './parts/trigger.js'
import type { TSelectProps } from './types.js'

import '../../internal/styles/floating-surface.css'
import '../../internal/styles/option-list.css'
import './select.css'

export type {
  TSelectContentProps,
  TSelectGroupLabelProps,
  TSelectGroupProps,
  TSelectItemProps,
  TSelectLabelProps,
  TSelectListProps,
  TSelectProps,
  TSelectSeparatorProps,
  TSelectSymbolProps,
  TSelectTriggerProps,
  TSelectValueProps,
} from './types.js'

export interface TSelectComponent extends React.FC<TSelectProps> {
  Root: typeof SelectRoot
  /** Renders the accessible label for the select. */
  Label: typeof SelectLabel
  /** Renders the trigger button for opening the select popup. */
  Trigger: typeof SelectTrigger
  /** Renders the currently selected value display. */
  Value: typeof SelectValue
  /** Renders the dropdown chevron symbol. */
  Symbol: typeof SelectSymbol
  /** Renders the popup container for options. */
  Content: typeof SelectContent
  /** Renders the list container of options. */
  List: typeof SelectList
  /** Renders a selectable option item. */
  Item: typeof SelectItem
  /** Groups related select options. */
  Group: typeof SelectGroup
  /** Renders the label of an option group. */
  GroupLabel: typeof SelectGroupLabel
  /** Renders a line separator between options or groups. */
  Separator: typeof SelectSeparator
}

/**
 * Single-selection select built on Base UI. Compose it with `Select.Trigger`,
 * `Select.Value`, `Select.Symbol`, and `Select.Content`. Forwards refs to the
 * DOM element each part renders.
 */
export const Select: TSelectComponent = Object.assign(SelectRoot, {
  Root: SelectRoot,
  Label: SelectLabel,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Symbol: SelectSymbol,
  Content: SelectContent,
  List: SelectList,
  Item: SelectItem,
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
  Separator: SelectSeparator,
})
