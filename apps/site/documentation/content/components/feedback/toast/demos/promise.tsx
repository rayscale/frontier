import { Button, toast, ToastProvider } from '@rayscale/frontier'

export default function PromiseToast() {
  return (
    <>
      <Button
        onClick={() => {
          toast
            .promise(new Promise<string>((resolve) => setTimeout(resolve, 1500, 'report')), {
              loading: 'Exporting…',
              success: (name) => `Exported the ${name}.`,
              error: 'Could not export.',
            })
            .catch(() => undefined)
        }}
      >
        Export
      </Button>
      <ToastProvider />
    </>
  )
}
