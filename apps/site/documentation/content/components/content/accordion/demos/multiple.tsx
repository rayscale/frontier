import { Accordion } from '@rayscale/frontier'

export default function Multiple() {
  return (
    <div style={{ width: 360 }}>
      <Accordion type="multiple" defaultValue={['shipping', 'returns']}>
        <Accordion.Item value="shipping" title="Shipping">
          Orders ship within two business days.
        </Accordion.Item>
        <Accordion.Item value="returns" title="Returns">
          You can return an item within thirty days.
        </Accordion.Item>
        <Accordion.Item value="support" title="Support">
          Write to us any time and we will answer.
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
