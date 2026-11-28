import type { ReactElement } from 'react'

import { colorPickerContext } from '../context.js'
import { useColorState } from '../hooks/use-color-state.js'
import type { TColorPickerRootProps } from '../types.js'

/** Holds the color and shares it with the parts inside. It renders no element of its own. */
export function ColorPickerRoot({
  children,
  disabled = false,
  ...props
}: TColorPickerRootProps): ReactElement {
  const state = useColorState(props)

  return (
    <colorPickerContext.Provider value={{ ...state, disabled }}>
      {children}
    </colorPickerContext.Provider>
  )
}
