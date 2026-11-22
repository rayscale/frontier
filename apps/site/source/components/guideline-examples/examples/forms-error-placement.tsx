import { Callout, CircleX, Field } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

export default function FormsErrorPlacement({ side }: TExampleProps): ReactElement {
  return (
    <div style={{ display: 'grid', gap: 12, width: '100%' }}>
      <Callout tone="danger">
        <Callout.Icon>
          <CircleX />
        </Callout.Icon>
        <Callout.Content>
          <Callout.Title>
            {side === 'do' ? 'There is 1 error in this form' : 'Invalid input'}
          </Callout.Title>
          {side === 'do' ? <p>Email address: enter a valid email address.</p> : null}
        </Callout.Content>
      </Callout>
      <Field.Root invalid={side === 'do'}>
        <Field.Label>Email address</Field.Label>
        <Field.Box>
          <Field.Control defaultValue="not-an-email" />
        </Field.Box>
        {side === 'do' ? <Field.Error match>Enter a valid email address.</Field.Error> : null}
      </Field.Root>
    </div>
  )
}
