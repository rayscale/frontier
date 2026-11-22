import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

export default function ColorsStatusContrast({ side }: TExampleProps): ReactElement {
  return (
    <strong
      style={{
        color:
          side === 'do'
            ? 'var(--frontier-color-danger)'
            : 'color-mix(in srgb, var(--frontier-color-danger) 40%, var(--frontier-color-surface-sunken))',
        fontSize: '1.125rem',
      }}
    >
      Payment failed
    </strong>
  )
}
