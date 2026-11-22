import { CodeBlock } from '@rayscale/frontier'

export default function Footer() {
  return (
    <CodeBlock>
      <CodeBlock.Content>{'pnpm add @rayscale/frontier'}</CodeBlock.Content>
      <CodeBlock.Footer>Run it in the root of your project.</CodeBlock.Footer>
    </CodeBlock>
  )
}
