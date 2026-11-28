import { Mentions } from '@rayscale/frontier'

const people = [
  { id: 'ana', label: 'Ana García', insert: '@ana' },
  { id: 'ben', label: 'Ben Carter', insert: '@ben' },
]

const commands = [
  { id: 'summarize', label: 'summarize', description: 'Sum up the conversation' },
  { id: 'translate', label: 'translate', description: 'Translate the message' },
  { id: 'clear', label: 'clear', description: 'Start a new conversation' },
]

export default function Commands() {
  return (
    <div style={{ width: '24rem', maxWidth: '100%', minHeight: '16rem' }}>
      <Mentions
        defaultValue="/summarize the notes of @ana"
        label="Message"
        triggers={[
          { char: '@', items: people, label: 'People' },
          { char: '/', items: commands, atStart: true, label: 'Commands' },
        ]}
      />
    </div>
  )
}
