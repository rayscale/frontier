import { Mentions, Textarea } from '@rayscale/frontier'

const people = [
  { id: 'ana', label: 'Ana García', insert: '@ana' },
  { id: 'ben', label: 'Ben Carter', insert: '@ben' },
]

const commands = [
  {
    id: 'summarize',
    label: 'summarize',
    description: 'Sum up the conversation',
    insert: '/summarize',
  },
  {
    id: 'translate',
    label: 'translate',
    description: 'Translate the message',
    insert: '/translate',
  },
  { id: 'clear', label: 'clear', description: 'Start a new conversation', insert: '/clear' },
]

export default function Commands() {
  return (
    <div style={{ width: '24rem', maxWidth: '100%', minHeight: '14rem' }}>
      <Mentions
        triggers={[
          { char: '@', items: people, label: 'People' },
          { char: '/', items: commands, atStart: true, label: 'Commands' },
        ]}
      >
        <Textarea label="Message" placeholder="Try @ or / at the start" />
      </Mentions>
    </div>
  )
}
