import { Field } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

export default function FormsLabel({ side }: TExampleProps): ReactElement {
  return (
    <Field.Root>
      {side === 'do' ? <Field.Label>Email address</Field.Label> : null}
      <Field.Box>
        <Field.Control
          defaultValue="ana@example.com"
          placeholder={side === 'do' ? undefined : 'Email address'}
        />
      </Field.Box>
      {side === 'do' ? (
        <Field.Description>Use the address you signed up with.</Field.Description>
      ) : null}
    </Field.Root>
  )
}
