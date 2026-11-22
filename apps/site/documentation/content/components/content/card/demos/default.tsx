import { Button, Card } from '@rayscale/frontier'

export default function Default() {
  return (
    <Card style={{ width: 360 }}>
      <Card.Header>
        <Card.Title>Project settings</Card.Title>
        <Card.Description>Manage how this project is shared and built.</Card.Description>
      </Card.Header>
      <Card.Content>Visibility is set to private for all collaborators.</Card.Content>
      <Card.Footer>
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </Card.Footer>
    </Card>
  )
}
