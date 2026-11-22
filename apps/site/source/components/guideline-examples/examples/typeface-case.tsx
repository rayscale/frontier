import { Button } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

export default function TypefaceCase({ side }: TExampleProps): ReactElement {
  return side === 'do' ? (
    <Button>Save changes</Button>
  ) : (
    <Button style={{ textTransform: 'uppercase' }}>Save changes</Button>
  )
}
