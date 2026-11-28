import { Check, FileText, Settings, Stepper, UserRound } from '@rayscale/frontier'

export default function Icons() {
  return (
    <Stepper.Root defaultValue={2}>
      <Stepper.List aria-label="Account setup">
        <Stepper.Item value={1}>
          <Stepper.Indicator>
            <UserRound />
          </Stepper.Indicator>
          <Stepper.Title>Account</Stepper.Title>
        </Stepper.Item>
        <Stepper.Item value={2}>
          <Stepper.Indicator>
            <FileText />
          </Stepper.Indicator>
          <Stepper.Title>Details</Stepper.Title>
        </Stepper.Item>
        <Stepper.Item value={3}>
          <Stepper.Indicator>
            <Settings />
          </Stepper.Indicator>
          <Stepper.Title>Settings</Stepper.Title>
        </Stepper.Item>
        <Stepper.Item value={4}>
          <Stepper.Indicator>
            <Check />
          </Stepper.Indicator>
          <Stepper.Title>Done</Stepper.Title>
        </Stepper.Item>
      </Stepper.List>
    </Stepper.Root>
  )
}
