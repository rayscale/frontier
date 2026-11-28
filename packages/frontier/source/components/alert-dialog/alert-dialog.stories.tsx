import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '../button/button.js'

import { AlertDialog } from './alert-dialog.js'

function AsyncExample() {
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (!deleting) {
          setOpen(next)
        }
      }}
    >
      <AlertDialog.Trigger>
        <Button variant="danger">Delete project</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Delete this project?</AlertDialog.Title>
          <AlertDialog.Description>
            The files and the history are deleted from the server.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel disabled={deleting}>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action
            variant="danger"
            disabled={deleting}
            onClick={(event) => {
              event.preventDefault()
              setDeleting(true)
              // Stands for a request to a server.
              setTimeout(() => {
                setDeleting(false)
                setOpen(false)
              }, 1200)
            }}
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Asks people to confirm something before it happens. They cannot dismiss it by pressing outside, and the focus starts on the cancel.',
      },
    },
  },
} satisfies Meta<typeof AlertDialog>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'A question with a cancel and an action. The focus starts on the cancel, and the backdrop does not close it.',
      },
    },
  },
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button variant="outline">Sign out</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Sign out?</AlertDialog.Title>
          <AlertDialog.Description>
            You will need to sign in again to see your projects.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action>Sign out</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  ),
}

export const Destructive: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'When the action destroys something, give it `variant="danger"` and say in the description what is lost.',
      },
    },
  },
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button variant="danger">Delete account</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Delete your account?</AlertDialog.Title>
          <AlertDialog.Description>
            Your projects and your history are deleted for good. This cannot be undone.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Keep my account</AlertDialog.Cancel>
          <AlertDialog.Action variant="danger">Delete account</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  ),
}

export const SlowAction: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Call `preventDefault` in the action to keep the dialog open while the work is done, then close it yourself.',
      },
    },
  },
  render: () => <AsyncExample />,
}
