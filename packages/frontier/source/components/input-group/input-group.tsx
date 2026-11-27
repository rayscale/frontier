import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import { InputGroupRoot } from './parts/root.js'
import {
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from './parts/sections.js'
import type { TInputGroupRootProps } from './types.js'

import './input-group.css'

export type {
  TInputGroupAddonProps,
  TInputGroupAlign,
  TInputGroupInputProps,
  TInputGroupRootProps,
  TInputGroupTextareaProps,
  TInputGroupTextProps,
} from './types.js'

export interface TInputGroupComponent extends ForwardRefExoticComponent<
  TInputGroupRootProps & RefAttributes<HTMLDivElement>
> {
  /** One bordered box that holds a field and its controls, with an optional label, description, and error. */
  Root: typeof InputGroupRoot
  /** The single-line field of the group. */
  Input: typeof InputGroupInput
  /** The multi-line field of the group. */
  Textarea: typeof InputGroupTextarea
  /** A strip of content attached to the start, end, top, or bottom of the field. */
  Addon: typeof InputGroupAddon
  /** Static text, such as a prefix or a counter, inside an addon. */
  Text: typeof InputGroupText
}

/**
 * A field with controls attached to it in one box, such as a message box with actions below it or
 * a search field with a button beside it. Compose it with `InputGroup.Input` or
 * `InputGroup.Textarea` and any number of `InputGroup.Addon`.
 */
export const InputGroup: TInputGroupComponent = Object.assign(InputGroupRoot, {
  Root: InputGroupRoot,
  Input: InputGroupInput,
  Textarea: InputGroupTextarea,
  Addon: InputGroupAddon,
  Text: InputGroupText,
})
