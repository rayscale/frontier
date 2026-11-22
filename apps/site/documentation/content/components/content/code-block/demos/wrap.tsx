import { CodeBlock } from '@rayscale/frontier'

const code =
  'curl --request POST --header "Content-Type: application/json" --data \'{"name":"Frontier"}\' https://example.com/api/projects'

export default function Wrap() {
  return (
    <div style={{ width: 360 }}>
      <CodeBlock>
        <CodeBlock.Content wrap>{code}</CodeBlock.Content>
      </CodeBlock>
    </div>
  )
}
