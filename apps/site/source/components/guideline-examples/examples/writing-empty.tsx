import { Button, Empty, FolderOpen } from '@rayscale/frontier'
import type { ReactElement } from 'react'

import type { TExampleProps } from '../types.js'

export default function WritingEmpty({ side }: TExampleProps): ReactElement {
  return side === 'do' ? (
    <Empty>
      <Empty.Header>
        <Empty.Media variant="icon">
          <FolderOpen />
        </Empty.Media>
        <Empty.Title>No projects yet</Empty.Title>
        <Empty.Description>Create a project to get started.</Empty.Description>
      </Empty.Header>
      <Empty.Content>
        <Button size="small">New project</Button>
      </Empty.Content>
    </Empty>
  ) : (
    <Empty>
      <Empty.Header>
        <Empty.Title>Nothing to see here.</Empty.Title>
      </Empty.Header>
    </Empty>
  )
}
