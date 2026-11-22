import { Accordion } from '@rayscale/frontier'

export default function Disabled() {
  return (
    <div style={{ width: 360 }}>
      <Accordion type="single">
        <Accordion.Item value="shipping" title="Shipping">
          Orders ship within two business days.
        </Accordion.Item>
        <Accordion.Item value="returns" title="Returns" disabled>
          You can return an item within thirty days.
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
