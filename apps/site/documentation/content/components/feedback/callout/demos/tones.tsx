import { Callout, Check, CircleX, Info, TriangleAlert } from '@rayscale/frontier'

export default function Tones() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Callout tone="info">
        <Callout.Icon>
          <Info />
        </Callout.Icon>
        <Callout.Content>
          <Callout.Title>Info</Callout.Title>
          <p>Something people may want to know.</p>
        </Callout.Content>
      </Callout>
      <Callout tone="success">
        <Callout.Icon>
          <Check />
        </Callout.Icon>
        <Callout.Content>
          <Callout.Title>Success</Callout.Title>
          <p>The change was saved.</p>
        </Callout.Content>
      </Callout>
      <Callout tone="warning">
        <Callout.Icon>
          <TriangleAlert />
        </Callout.Icon>
        <Callout.Content>
          <Callout.Title>Warning</Callout.Title>
          <p>Check this before you continue.</p>
        </Callout.Content>
      </Callout>
      <Callout tone="danger">
        <Callout.Icon>
          <CircleX />
        </Callout.Icon>
        <Callout.Content>
          <Callout.Title>Danger</Callout.Title>
          <p>The change could not be saved.</p>
        </Callout.Content>
      </Callout>
    </div>
  )
}
