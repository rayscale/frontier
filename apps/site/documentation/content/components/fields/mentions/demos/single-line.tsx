import { Input, Mentions } from '@rayscale/frontier'

const people = [
  { id: 'ana', label: 'Ana García', insert: '@ana' },
  { id: 'ben', label: 'Ben Carter', insert: '@ben' },
  { id: 'carla', label: 'Carla Núñez', insert: '@carla' },
]

export default function SingleLine() {
  return (
    <div style={{ width: '20rem', maxWidth: '100%', minHeight: '12rem' }}>
      <Mentions triggers={[{ char: '@', items: people, label: 'People' }]}>
        <Input label="Assign to" placeholder="Type @" />
      </Mentions>
    </div>
  )
}
