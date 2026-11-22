import { Button, toast, ToastProvider } from '@rayscale/frontier'

export default function Position() {
  return (
    <>
      <Button onClick={() => toast('Shown at the top.')}>Show toast</Button>
      <ToastProvider position="top-center" />
    </>
  )
}
