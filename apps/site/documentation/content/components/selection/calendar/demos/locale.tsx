import { Calendar } from '@rayscale/frontier'

export default function Locale() {
  return <Calendar defaultMonth={new Date(2025, 2, 1)} weekStartsOn={1} locale="es-ES" />
}
