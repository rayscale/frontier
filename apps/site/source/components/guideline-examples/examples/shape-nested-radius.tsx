import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

export default function ShapeNestedRadius({ side }: TExampleProps): ReactElement {
  return (
    <div
      style={{
        background: 'var(--frontier-color-surface-raised)',
        border: '1px solid var(--frontier-color-border)',
        borderRadius: 'var(--frontier-radius-xl)',
        height: 130,
        padding: 20,
        width: 180,
      }}
    >
      <div
        style={{
          background: 'color-mix(in srgb, var(--frontier-color-primary) 30%, transparent)',
          borderRadius:
            side === 'do' ? 'calc(var(--frontier-radius-xl) - 20px)' : 'var(--frontier-radius-xl)',
          height: '100%',
        }}
      />
    </div>
  )
}
