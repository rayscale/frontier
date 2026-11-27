import { Button, Stepper } from '@rayscale/frontier'
import { useState } from 'react'

const panel = {
  padding: '1rem',
  border: 'var(--frontier-border-width) solid var(--frontier-color-border)',
  borderRadius: 'var(--frontier-radius-lg)',
}

export default function Interactive() {
  const [step, setStep] = useState(1)

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <Stepper.Root value={step} onValueChange={setStep}>
        <Stepper.List aria-label="Account setup">
          <Stepper.Item value={1}>
            <Stepper.Indicator />
            <Stepper.Title>Account</Stepper.Title>
          </Stepper.Item>
          <Stepper.Item value={2}>
            <Stepper.Indicator />
            <Stepper.Title>Profile</Stepper.Title>
          </Stepper.Item>
          <Stepper.Item value={3} disabled={step < 2}>
            <Stepper.Indicator />
            <Stepper.Title>Review</Stepper.Title>
          </Stepper.Item>
        </Stepper.List>
        <Stepper.Panel value={1} style={panel}>
          Create your account and verify your email.
        </Stepper.Panel>
        <Stepper.Panel value={2} style={panel}>
          Tell us a little about yourself.
        </Stepper.Panel>
        <Stepper.Panel value={3} style={panel}>
          Check your details before you finish.
        </Stepper.Panel>
      </Stepper.Root>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outline"
          disabled={step === 1}
          onClick={() => {
            setStep(step - 1)
          }}
        >
          Back
        </Button>
        <Button
          disabled={step === 3}
          onClick={() => {
            setStep(step + 1)
          }}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
