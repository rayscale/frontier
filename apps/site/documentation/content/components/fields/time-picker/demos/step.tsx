import { TimePicker } from '@rayscale/frontier'

export default function Step() {
  return <TimePicker aria-label="Appointment" minuteStep={15} defaultValue="09:15" />
}
