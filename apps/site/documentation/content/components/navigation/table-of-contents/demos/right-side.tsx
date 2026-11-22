import { TableOfContents } from '@rayscale/frontier'

export default function RightSide() {
  return (
    <TableOfContents.Root aria-label="On this page" side="right">
      <TableOfContents.Header>On this page</TableOfContents.Header>
      <TableOfContents.List>
        <TableOfContents.Item href="#toc-demo-intro" label="Introduction" />
        <TableOfContents.Item href="#toc-demo-usage" label="Usage" />
        <TableOfContents.Item href="#toc-demo-api" label="API reference" />
      </TableOfContents.List>
    </TableOfContents.Root>
  )
}
