import { Button, Empty, FolderOpen, Plus } from '@rayscale/frontier'

export default function Default() {
  return (
    <Empty>
      <Empty.Header>
        <Empty.Media variant="icon">
          <FolderOpen />
        </Empty.Media>
        <Empty.Title>No projects yet</Empty.Title>
        <Empty.Description>Create a project to see it appear here.</Empty.Description>
      </Empty.Header>
      <Empty.Content>
        <Button>
          <Plus />
          New project
        </Button>
      </Empty.Content>
    </Empty>
  )
}
