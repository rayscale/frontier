import { Button } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

export default function ColorsPrimaryRole({ side }: TExampleProps): ReactElement {
  return side === 'do' ? (
    <>
      <Button>Save</Button>
      <Button variant="outline">Cancel</Button>
    </>
  ) : (
    <>
      <span
        style={{
          background: 'var(--frontier-color-primary)',
          borderRadius: '50%',
          height: 40,
          width: 40,
        }}
      />
      <strong style={{ color: 'var(--frontier-color-primary)', fontSize: '1.25rem' }}>
        Welcome back
      </strong>
      <Button variant="outline">Save</Button>
    </>
  )
}
