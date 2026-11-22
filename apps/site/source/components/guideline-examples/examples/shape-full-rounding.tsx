import { Avatar, Badge, Switch } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

export default function ShapeFullRounding({ side }: TExampleProps): ReactElement {
  return side === 'do' ? (
    <>
      <Badge>New</Badge>
      <Avatar>
        <Avatar.Fallback>AM</Avatar.Fallback>
      </Avatar>
      <Switch label="Airplane mode" />
    </>
  ) : (
    <div
      style={{
        background: 'var(--frontier-color-surface-raised)',
        border: '1px solid var(--frontier-color-border)',
        borderRadius: 'var(--frontier-radius-full)',
        display: 'grid',
        gap: 12,
        padding: '28px 36px',
        width: '100%',
      }}
    >
      <strong>Account details</strong>
      <div
        style={{
          border: '1px solid var(--frontier-color-border-strong)',
          borderRadius: 'var(--frontier-radius-full)',
          color: 'var(--frontier-color-text-muted)',
          padding: '8px 16px',
        }}
      >
        Name
      </div>
    </div>
  )
}
