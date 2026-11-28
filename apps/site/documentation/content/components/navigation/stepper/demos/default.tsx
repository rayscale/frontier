import { Stepper } from '@rayscale/frontier'

const panel = {
  padding: '1rem',
  border: 'var(--frontier-border-width) solid var(--frontier-color-border)',
  borderRadius: 'var(--frontier-radius-lg)',
}

export default function Default() {
  return (
    <Stepper.Root defaultValue={2}>
      <Stepper.List aria-label="Account setup">
        <Stepper.Item value={1}>
          <Stepper.Indicator />
        </Stepper.Item>
        <Stepper.Item value={2}>
          <Stepper.Indicator />
        </Stepper.Item>
        <Stepper.Item value={3}>
          <Stepper.Indicator />
        </Stepper.Item>
        <Stepper.Item value={4}>
          <Stepper.Indicator />
        </Stepper.Item>
      </Stepper.List>
      <Stepper.Panel value={1} style={panel}>
        Create your account and verify your email.
      </Stepper.Panel>
      <Stepper.Panel value={2} style={panel}>
        Tell us a little about yourself.
      </Stepper.Panel>
      <Stepper.Panel value={3} style={panel}>
        Choose the plan that fits your team.
      </Stepper.Panel>
      <Stepper.Panel value={4} style={panel}>
        Check your details before you finish.
      </Stepper.Panel>
    </Stepper.Root>
  )
}
