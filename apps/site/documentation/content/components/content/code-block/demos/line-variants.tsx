import { CodeBlock } from '@rayscale/frontier'

export default function LineVariants() {
  return (
    <CodeBlock>
      <CodeBlock.Header>
        <CodeBlock.Title>package.json</CodeBlock.Title>
      </CodeBlock.Header>
      <CodeBlock.Content>
        <CodeBlock.Line>{'"scripts": {'}</CodeBlock.Line>
        <CodeBlock.Line variant="removed">{'  "start": "node index.js",'}</CodeBlock.Line>
        <CodeBlock.Line variant="added">{'  "start": "node dist/index.js",'}</CodeBlock.Line>
        <CodeBlock.Line variant="highlighted">{'  "build": "tsc"'}</CodeBlock.Line>
        <CodeBlock.Line>{'}'}</CodeBlock.Line>
      </CodeBlock.Content>
    </CodeBlock>
  )
}
