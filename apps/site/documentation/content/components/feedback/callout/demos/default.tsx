import { Callout, Info } from '@rayscale/frontier'

export default function Default() {
  return (
    <Callout>
      <Callout.Icon>
        <Info />
      </Callout.Icon>
      <Callout.Content>
        <Callout.Title>Workspace settings changed</Callout.Title>
        <p>Changes apply to every project in this workspace.</p>
      </Callout.Content>
    </Callout>
  )
}
