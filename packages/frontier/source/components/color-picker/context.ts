import { createContext, useContext } from 'react'

import { type TColorState, useColorState } from './hooks/use-color-state.js'
import type { TColorValueProps } from './types.js'

export interface TcolorPickerContextValue extends TColorState {
  readonly disabled: boolean
}

export const colorPickerContext = createContext<TcolorPickerContextValue | null>(null)

/**
 * The color a part works on: the one from `ColorPicker.Root` when there is one, otherwise one that
 * the part keeps from its own props.
 */
export function useColorControl(
  props: TColorValueProps & { disabled?: boolean | undefined },
): TcolorPickerContextValue {
  const context = useContext(colorPickerContext)
  const own = useColorState(props)

  const disabled = (context?.disabled ?? false) || (props.disabled ?? false)

  return { ...(context ?? own), disabled }
}
