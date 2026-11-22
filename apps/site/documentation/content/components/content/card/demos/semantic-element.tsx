import { Card } from '@rayscale/frontier'

export default function SemanticElement() {
  return (
    <Card as="article" style={{ width: 360 }}>
      <Card.Header>
        <Card.Title as="h2">Release notes</Card.Title>
        <Card.Description>What changed this month.</Card.Description>
      </Card.Header>
      <Card.Content>Faster search and a new dark mode.</Card.Content>
    </Card>
  )
}
