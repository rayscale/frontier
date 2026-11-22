import { Field } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

export default function WritingLabel({ side }: TExampleProps): ReactElement {
  return (
    <Field.Root>
      <Field.Label>
        {side === 'do' ? 'Billing address' : 'Please enter the address where we send your bills'}
      </Field.Label>
      <Field.Box>
        <Field.Control defaultValue="12 Harbor Street" />
      </Field.Box>
    </Field.Root>
  )
}
