import { TimePicker } from '@rayscale/frontier'

export default function TwelveHour() {
  return <TimePicker aria-label="Start time" format="12h" defaultValue="14:30" />
}
