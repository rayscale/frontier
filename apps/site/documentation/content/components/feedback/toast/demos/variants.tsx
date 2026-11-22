import { Button, toast, ToastProvider } from '@rayscale/frontier'

export default function Variants() {
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Button variant="outline" onClick={() => toast.success('Changes saved.')}>
          Success
        </Button>
        <Button variant="outline" onClick={() => toast.error('Could not save changes.')}>
          Error
        </Button>
        <Button variant="outline" onClick={() => toast.warning('Your session is about to expire.')}>
          Warning
        </Button>
        <Button variant="outline" onClick={() => toast.info('A new version is available.')}>
          Info
        </Button>
      </div>
      <ToastProvider />
    </>
  )
}
