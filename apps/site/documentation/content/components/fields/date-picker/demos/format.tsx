import { DatePicker } from '@rayscale/frontier'

export default function Format() {
  return (
    <DatePicker
      aria-label="Birthday"
      placeholder="Pick your birthday"
      locale="es-ES"
      defaultValue={new Date(2025, 2, 14)}
      formatDate={(date) =>
        date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
      }
    />
  )
}
