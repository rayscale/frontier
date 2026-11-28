import { ArrowUp, Button, Mentions, Plus } from '@rayscale/frontier'
import { useState } from 'react'

const people = [
  { id: 'ana', label: 'Ana García', description: 'ana@example.com', insert: '@ana' },
  { id: 'ben', label: 'Ben Carter', description: 'ben@example.com', insert: '@ben' },
]

export default function ChatBox() {
  const [value, setValue] = useState('')
  const [sent, setSent] = useState('Nothing sent yet.')

  function send(): void {
    if (value.trim() !== '') {
      setSent(`Sent “${value.trim()}”`)
      setValue('')
    }
  }

  return (
    <div style={{ display: 'grid', gap: '0.75rem', width: '26rem', maxWidth: '100%' }}>
      <Mentions
        description="Enter sends. Shift and Enter starts a new line."
        footer={
          <>
            <Button variant="outline" size="icon-small" aria-label="Attach a file">
              <Plus aria-hidden="true" />
            </Button>
            <Button
              size="icon-small"
              aria-label="Send"
              disabled={value.trim() === ''}
              style={{ marginInlineStart: 'auto' }}
              onClick={send}
            >
              <ArrowUp aria-hidden="true" />
            </Button>
          </>
        }
        label="Message"
        placeholder="Write a message…"
        rows={2}
        triggers={[{ char: '@', items: people, label: 'People' }]}
        value={value}
        onSubmit={send}
        onValueChange={setValue}
      />
      <span role="status">{sent}</span>
    </div>
  )
}
