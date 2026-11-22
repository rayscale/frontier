import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

export default function TypefaceEmphasis({ side }: TExampleProps): ReactElement {
  return (
    <p style={{ margin: 0 }}>
      Delete only the{' '}
      {side === 'do' ? (
        <strong>selected</strong>
      ) : (
        <span style={{ textDecoration: 'underline', textTransform: 'uppercase' }}>selected</span>
      )}{' '}
      files.
    </p>
  )
}
