import { CodeBlock } from '@rayscale/frontier'

const code = `import { Button } from '@rayscale/frontier'

export function Example() {
  return <Button>Save</Button>
}`

export default function Default() {
  return (
    <CodeBlock>
      <CodeBlock.Header>
        <CodeBlock.Title>example.tsx</CodeBlock.Title>
        <CodeBlock.Actions>
          <CodeBlock.CopyButton value={code} label="Copy code" />
        </CodeBlock.Actions>
      </CodeBlock.Header>
      <CodeBlock.Content>{code}</CodeBlock.Content>
    </CodeBlock>
  )
}
