import { Mentions, Textarea } from '@rayscale/frontier'
import { useState } from 'react'

const people = [
  { id: 'ana', label: 'Ana García', insert: '@ana' },
  { id: 'ben', label: 'Ben Carter', insert: '@ben' },
  { id: 'carla', label: 'Carla Núñez', insert: '@carla' },
  { id: 'dev', label: 'Dev Patel', insert: '@dev' },
]

export default function OwnSearch() {
  const [query, setQuery] = useState('')
  // Stands for a search on a server.
  const results = people.filter((person) =>
    person.label.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div style={{ width: '24rem', maxWidth: '100%', minHeight: '14rem' }}>
      <Mentions
        triggers={[{ char: '@', items: results, filter: false, label: 'People' }]}
        onQueryChange={setQuery}
      >
        <Textarea label="Comment" placeholder="Type @" />
      </Mentions>
    </div>
  )
}
