import { Button, Callout, Info } from '@rayscale/frontier'

export default function WithActions() {
  return (
    <Callout>
      <Callout.Icon>
        <Info />
      </Callout.Icon>
      <Callout.Content>
        <Callout.Title>A new version is available</Callout.Title>
        <p>Reload to get the latest changes.</p>
        <Callout.Actions>
          <Button size="small">Reload</Button>
          <Button size="small" variant="ghost">
            Later
          </Button>
        </Callout.Actions>
      </Callout.Content>
    </Callout>
  )
}
