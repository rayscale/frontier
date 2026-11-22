import { Field } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

export default function FormsValidationTiming({ side }: TExampleProps): ReactElement {
  return (
    <Field.Root invalid={side === 'dont'}>
      <Field.Label>Email address</Field.Label>
      <Field.Box>
        <Field.Control defaultValue="a" />
      </Field.Box>
      {side === 'dont' ? (
        <Field.Error match>Enter a valid email address.</Field.Error>
      ) : (
        <Field.Description>We check it when you leave the field.</Field.Description>
      )}
    </Field.Root>
  )
}
