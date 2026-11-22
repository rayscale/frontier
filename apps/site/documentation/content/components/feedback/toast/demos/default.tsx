import { Button, toast, ToastProvider } from '@rayscale/frontier'

export default function Default() {
  return (
    <>
      <Button onClick={() => toast('Link copied.')}>Show toast</Button>
      <ToastProvider />
    </>
  )
}
