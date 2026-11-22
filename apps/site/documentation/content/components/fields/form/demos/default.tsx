import { Button, Form, Input } from '@rayscale/frontier'
import { useState } from 'react'

export default function Default() {
  const [message, setMessage] = useState('')

  return (
    <>
      <Form
        onSubmit={(event) => {
          event.preventDefault()
          const name = new FormData(event.currentTarget).get('name')

          setMessage(`Welcome, ${typeof name === 'string' ? name : ''}.`)
        }}
      >
        <Input label="Name" name="name" required />
        <Button type="submit">Sign up</Button>
      </Form>
      <p>{message}</p>
    </>
  )
}
