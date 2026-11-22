import { CodeBlock } from '@rayscale/frontier'

const code = `pnpm add @rayscale/frontier
pnpm install
pnpm dev`

export default function LineNumbers() {
  return (
    <CodeBlock>
      <CodeBlock.Content lineNumbers>{code}</CodeBlock.Content>
    </CodeBlock>
  )
}
