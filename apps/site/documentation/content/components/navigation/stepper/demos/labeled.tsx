import { Stepper } from '@rayscale/frontier'

export default function Labeled() {
  return (
    <Stepper.Root defaultValue={2}>
      <Stepper.List aria-label="Checkout">
        <Stepper.Item value={1}>
          <Stepper.Indicator />
          <Stepper.Title>Cart</Stepper.Title>
        </Stepper.Item>
        <Stepper.Item value={2}>
          <Stepper.Indicator />
          <Stepper.Title>Shipping</Stepper.Title>
        </Stepper.Item>
        <Stepper.Item value={3}>
          <Stepper.Indicator />
          <Stepper.Title>Payment</Stepper.Title>
        </Stepper.Item>
        <Stepper.Item value={4}>
          <Stepper.Indicator />
          <Stepper.Title>Review</Stepper.Title>
        </Stepper.Item>
      </Stepper.List>
    </Stepper.Root>
  )
}
