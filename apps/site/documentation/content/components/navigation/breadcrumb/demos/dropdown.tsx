import { Breadcrumb } from '@rayscale/frontier'

export default function Dropdown() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Dropdown
        label="Projects"
        items={[
          { label: 'Design system', href: '#' },
          { label: 'Website', href: '#' },
          { label: 'Mobile app', href: '#' },
        ]}
      />
      <Breadcrumb.Item current>Design system</Breadcrumb.Item>
    </Breadcrumb>
  )
}
