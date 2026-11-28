import { Button, Callout, CheckCircle } from '@rayscale/frontier'
import { useState } from 'react'

export default function Dismissible() {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return (
      <Button
        variant="outline"
        onClick={() => {
          setVisible(true)
        }}
      >
        Show the message again
      </Button>
    )
  }

  return (
    <Callout
      tone="success"
      role="status"
      onDismiss={() => {
        setVisible(false)
      }}
    >
      <Callout.Icon>
        <CheckCircle />
      </Callout.Icon>
      <Callout.Content>
        <Callout.Title>Changes saved</Callout.Title>
        <p>Your settings are up to date.</p>
      </Callout.Content>
    </Callout>
  )
}
