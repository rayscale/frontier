import { Stepper } from '@rayscale/frontier'

const panel = {
  padding: '1rem',
  border: 'var(--frontier-border-width) solid var(--frontier-color-border)',
  borderRadius: 'var(--frontier-radius-lg)',
}

export default function Vertical() {
  return (
    <Stepper.Root orientation="vertical" defaultValue={3}>
      <Stepper.List aria-label="Order status">
        <Stepper.Item value={1}>
          <Stepper.Indicator />
          <Stepper.Title>Order placed</Stepper.Title>
          <Stepper.Description>Your order has been placed</Stepper.Description>
        </Stepper.Item>
        <Stepper.Item value={2}>
          <Stepper.Indicator />
          <Stepper.Title>Processing</Stepper.Title>
          <Stepper.Description>We are preparing your items</Stepper.Description>
        </Stepper.Item>
        <Stepper.Item value={3}>
          <Stepper.Indicator />
          <Stepper.Title>Shipped</Stepper.Title>
          <Stepper.Description>Your order is on its way</Stepper.Description>
        </Stepper.Item>
        <Stepper.Item value={4}>
          <Stepper.Indicator />
          <Stepper.Title>Delivered</Stepper.Title>
          <Stepper.Description>Delivered to your address</Stepper.Description>
        </Stepper.Item>
      </Stepper.List>
      <Stepper.Panel value={3} style={panel}>
        Your order is on its way to you.
      </Stepper.Panel>
    </Stepper.Root>
  )
}
