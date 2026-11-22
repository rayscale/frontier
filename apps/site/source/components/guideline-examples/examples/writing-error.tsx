import { Field } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

export default function WritingError({ side }: TExampleProps): ReactElement {
  return (
    <Field.Root invalid>
      <Field.Label>Attachment</Field.Label>
      <Field.Box>
        <Field.Control defaultValue="video.mov" />
      </Field.Box>
      <Field.Error match>
        {side === 'do' ? 'The file is larger than 10 MB. Choose a smaller file.' : 'Invalid input.'}
      </Field.Error>
    </Field.Root>
  )
}
