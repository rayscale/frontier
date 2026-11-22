import { TimePicker } from '@rayscale/frontier'

export default function Limits() {
  return <TimePicker aria-label="Opening hours" minTime="09:00" maxTime="17:30" minuteStep={30} />
}
