import { Mentions, Textarea } from '@rayscale/frontier'

const people = [
  { id: 'ana', label: 'Ana García', description: 'ana@example.com', insert: '@ana' },
  { id: 'ben', label: 'Ben Carter', description: 'ben@example.com', insert: '@ben' },
  { id: 'carla', label: 'Carla Núñez', description: 'carla@example.com', insert: '@carla' },
]

export default function Default() {
  return (
    <div style={{ width: '24rem', maxWidth: '100%', minHeight: '14rem' }}>
      <Mentions triggers={[{ char: '@', items: people, label: 'People' }]}>
        <Textarea label="Comment" placeholder="Type @ to mention someone" />
      </Mentions>
    </div>
  )
}
