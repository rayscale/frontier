import { Button, toast, ToastProvider } from '@rayscale/frontier'

export default function WithAction() {
  return (
    <>
      <Button
        onClick={() =>
          toast({
            title: 'Message deleted',
            description: 'You can bring it back.',
            action: { label: 'Undo', onClick: () => toast.success('Message restored.') },
          })
        }
      >
        Delete message
      </Button>
      <ToastProvider />
    </>
  )
}
