import { CopyButton } from '@rayscale/frontier'
import { useState } from 'react'

export default function Callbacks() {
  const [message, setMessage] = useState('Nothing copied yet.')

  return (
    <>
      <CopyButton
        value="pnpm add @rayscale/frontier"
        onCopy={(value) => {
          setMessage(`Copied ${value}`)
        }}
        onError={() => {
          setMessage('The text could not be copied.')
        }}
      />
      <p>{message}</p>
    </>
  )
}
