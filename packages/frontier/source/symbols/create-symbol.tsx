import { forwardRef } from 'react'

import { Symbol } from './symbol.js'
import type { TCreateSymbolOptions, TSymbolComponent, TSymbolProps } from './types.js'

/** Creates a symbol component from a named set of shapes on the 24-unit grid. */
export function createSymbol({ name, symbolNode }: TCreateSymbolOptions): TSymbolComponent {
  const Component = Object.assign(
    forwardRef<SVGSVGElement, Omit<TSymbolProps, 'symbolNode'>>(
      function SymbolComponent(props, ref) {
        return <Symbol {...props} ref={ref} symbolNode={symbolNode} />
      },
    ),
    { symbolNode },
  )

  Component.displayName = name

  return Component
}
