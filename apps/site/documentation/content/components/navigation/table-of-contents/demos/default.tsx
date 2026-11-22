import { TableOfContents } from '@rayscale/frontier'

export default function Default() {
  return (
    <TableOfContents.Root aria-label="On this page">
      <TableOfContents.Header>On this page</TableOfContents.Header>
      <TableOfContents.List>
        <TableOfContents.Item href="#toc-demo-intro" label="Introduction" />
        <TableOfContents.Item href="#toc-demo-usage" label="Usage">
          <TableOfContents.List>
            <TableOfContents.Item href="#toc-demo-install" label="Installation" />
            <TableOfContents.Item href="#toc-demo-import" label="Importing" />
          </TableOfContents.List>
        </TableOfContents.Item>
        <TableOfContents.Item href="#toc-demo-api" label="API reference" />
      </TableOfContents.List>
    </TableOfContents.Root>
  )
}
