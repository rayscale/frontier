import { Button } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

export default function WritingAction({ side }: TExampleProps): ReactElement {
  return side === 'do' ? (
    <>
      <Button>Save changes</Button>
      <Button variant="danger">Delete file</Button>
    </>
  ) : (
    <>
      <Button>OK</Button>
      <Button variant="outline">Submit</Button>
    </>
  )
}
