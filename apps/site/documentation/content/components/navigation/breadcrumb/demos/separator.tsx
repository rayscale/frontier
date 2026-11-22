import { Breadcrumb } from '@rayscale/frontier'

export default function Separator() {
  return (
    <Breadcrumb separator="/">
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="#">Documentation</Breadcrumb.Item>
      <Breadcrumb.Item current>Components</Breadcrumb.Item>
    </Breadcrumb>
  )
}
