import { Callout, Check } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

export default function WritingConfirmation({ side }: TExampleProps): ReactElement {
  return (
    <Callout tone="success">
      <Callout.Icon>
        <Check />
      </Callout.Icon>
      <Callout.Content>
        <Callout.Title>
          {side === 'do' ? 'Changes saved.' : 'Awesome! Your changes were saved successfully!'}
        </Callout.Title>
      </Callout.Content>
    </Callout>
  )
}
