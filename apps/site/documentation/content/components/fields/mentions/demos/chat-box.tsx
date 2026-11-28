import { ArrowUp, Button, InputGroup, Mentions, Plus } from '@rayscale/frontier'
import { useState } from 'react'

const people = [
  { id: 'ana', label: 'Ana García', description: 'ana@example.com', insert: '@ana' },
  { id: 'ben', label: 'Ben Carter', description: 'ben@example.com', insert: '@ben' },
  { id: 'carla', label: 'Carla Núñez', description: 'carla@example.com', insert: '@carla' },
]

const commands = [
  {
    id: 'summarize',
    label: 'summarize',
    description: 'Sum up the conversation',
    insert: '/summarize',
  },
  { id: 'clear', label: 'clear', description: 'Start a new conversation', insert: '/clear' },
]

export default function ChatBox() {
  const [value, setValue] = useState('')

  return (
    <div style={{ width: '26rem', maxWidth: '100%', minHeight: '18rem' }}>
      <Mentions
        triggers={[
          { char: '@', items: people, label: 'People' },
          { char: '/', items: commands, atStart: true, label: 'Commands' },
        ]}
      >
        <InputGroup label="Message" description="Type @ to mention someone, or / for a command.">
          <InputGroup.Textarea
            placeholder="Write a message…"
            value={value}
            onChange={(event) => {
              setValue(event.target.value)
            }}
          />
          <InputGroup.Addon align="bottom">
            <Button variant="outline" size="icon-small" aria-label="Attach a file">
              <Plus aria-hidden="true" />
            </Button>
            <Button
              size="icon-small"
              aria-label="Send"
              disabled={value.length === 0}
              style={{ marginInlineStart: 'auto' }}
            >
              <ArrowUp aria-hidden="true" />
            </Button>
          </InputGroup.Addon>
        </InputGroup>
      </Mentions>
    </div>
  )
}
