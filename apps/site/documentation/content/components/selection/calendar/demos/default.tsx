import { Calendar } from '@rayscale/frontier'

export default function Default() {
  return <Calendar defaultMonth={new Date(2025, 2, 1)} locale="en-US" />
}
