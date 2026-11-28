import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties, SyntheticEvent } from 'react'
import { useId, useState } from 'react'

import { Button } from '../button/button.js'
import { Input } from '../input/input.js'

import { Sheet, type TSheetSide, type TSheetSize } from './sheet.js'

const meta = {
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet>

export default meta

type TStory = StoryObj<typeof meta>

const sides: readonly TSheetSide[] = ['right', 'left', 'top', 'bottom']
const sizes: readonly TSheetSize[] = ['small', 'medium', 'large']

const sideLabels: { [TKey in TSheetSide]: string } = {
  right: 'Right',
  left: 'Left',
  top: 'Top',
  bottom: 'Bottom',
}

const rowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  alignItems: 'center',
}

const stackStyle: CSSProperties = {
  display: 'grid',
  gap: '0.75rem',
  justifyItems: 'start',
  margin: 0,
}

const formStackStyle: CSSProperties = {
  display: 'grid',
  gap: '1rem',
  margin: 0,
}

const demoPanelStyle: CSSProperties = {
  display: 'grid',
  gap: '0.75rem',
}

function SideSheet({ side }: { side: TSheetSide }) {
  return (
    <Sheet side={side}>
      <Sheet.Trigger>
        <Button variant="outline">{sideLabels[side]} sheet</Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header>
          <Sheet.Title>{sideLabels[side]} sheet</Sheet.Title>
          <Sheet.Description>
            This sheet slides in from the {side} edge of the viewport.
          </Sheet.Description>
        </Sheet.Header>
        <Sheet.Footer>
          <Sheet.Close>Done</Sheet.Close>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  )
}

function SizeSheet({ size }: { size: TSheetSize }) {
  return (
    <Sheet>
      <Sheet.Trigger>
        <Button variant="outline">{size} sheet</Button>
      </Sheet.Trigger>
      <Sheet.Content size={size}>
        <Sheet.Header>
          <Sheet.Title>{size} sheet</Sheet.Title>
          <Sheet.Description>
            Sizes set the width of right and left sheets and the height of top and bottom sheets.
          </Sheet.Description>
        </Sheet.Header>
        <Sheet.Footer>
          <Sheet.Close>Done</Sheet.Close>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  )
}

function ControlledSheet() {
  const [open, setOpen] = useState(false)
  const [lastAction, setLastAction] = useState('The sheet has not been opened yet.')

  return (
    <div style={stackStyle}>
      <p style={{ margin: 0 }}>{lastAction}</p>
      <Sheet
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen)
          setLastAction(
            nextOpen
              ? 'The sheet was opened by the parent.'
              : 'The sheet was closed by the parent.',
          )
        }}
      >
        <Sheet.Trigger>
          <Button>Open controlled sheet</Button>
        </Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Controlled sheet</Sheet.Title>
            <Sheet.Description>
              The parent owns the open state and reacts to every change request.
            </Sheet.Description>
          </Sheet.Header>
          <Sheet.Footer>
            <Sheet.Close>Close</Sheet.Close>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    </div>
  )
}

function FormSheet() {
  const formId = useId()
  const [status, setStatus] = useState('No changes saved yet.')
  const [projectName, setProjectName] = useState('One')

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus(`Saved project "${projectName.trim() || 'Untitled'}".`)
  }

  return (
    <div style={stackStyle}>
      <p style={{ margin: 0 }}>{status}</p>
      <Sheet>
        <Sheet.Trigger>
          <Button>Edit project</Button>
        </Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Edit project</Sheet.Title>
            <Sheet.Description>Rename the project and choose how it is shared.</Sheet.Description>
          </Sheet.Header>
          <form id={formId} onSubmit={handleSubmit} style={formStackStyle}>
            <Input
              label="Project name"
              name="projectName"
              value={projectName}
              onChange={(event) => {
                setProjectName(event.target.value)
              }}
              required
            />
            <Input
              label="Owner email"
              name="ownerEmail"
              type="email"
              placeholder="you@example.com"
            />
          </form>
          <Sheet.Footer>
            <Sheet.Close>Cancel</Sheet.Close>
            <Button type="submit" form={formId} variant="primary">
              Save changes
            </Button>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    </div>
  )
}

function NestedSheets() {
  return (
    <Sheet>
      <Sheet.Trigger>
        <Button>Open project settings</Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header>
          <Sheet.Title>Project settings</Sheet.Title>
          <Sheet.Description>
            Review access for this project. Each level opens above the one before it.
          </Sheet.Description>
        </Sheet.Header>
        <div style={demoPanelStyle}>
          <p style={{ margin: 0 }}>Visibility: private to the workspace.</p>
          <Sheet side="right">
            <Sheet.Trigger>
              <Button variant="outline">Manage members</Button>
            </Sheet.Trigger>
            <Sheet.Content size="small">
              <Sheet.Header>
                <Sheet.Title>Members</Sheet.Title>
                <Sheet.Description>Three people can edit this project.</Sheet.Description>
              </Sheet.Header>
              <div style={demoPanelStyle}>
                <p style={{ margin: 0 }}>Ada Lovelace, owner</p>
                <p style={{ margin: 0 }}>Grace Hopper, editor</p>
                <p style={{ margin: 0 }}>Katherine Johnson, viewer</p>
                <Sheet side="bottom">
                  <Sheet.Trigger>
                    <Button variant="secondary">Invite someone</Button>
                  </Sheet.Trigger>
                  <Sheet.Content>
                    <Sheet.Header>
                      <Sheet.Title>Invite a member</Sheet.Title>
                      <Sheet.Description>Invitations expire after seven days.</Sheet.Description>
                    </Sheet.Header>
                    <Input
                      label="Email address"
                      name="inviteEmail"
                      type="email"
                      placeholder="you@example.com"
                    />
                    <Sheet.Footer>
                      <Sheet.Close>Cancel</Sheet.Close>
                      <Sheet.Close variant="primary">Send invite</Sheet.Close>
                    </Sheet.Footer>
                  </Sheet.Content>
                </Sheet>
              </div>
              <Sheet.Footer>
                <Sheet.Close>Done</Sheet.Close>
              </Sheet.Footer>
            </Sheet.Content>
          </Sheet>
        </div>
        <Sheet.Footer>
          <Sheet.Close>Close settings</Sheet.Close>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  )
}

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'The default modal sheet sliding in from the right.',
      },
    },
  },
  render: () => (
    <Sheet>
      <Sheet.Trigger>
        <Button>Open sheet</Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header>
          <Sheet.Title>Share project</Sheet.Title>
          <Sheet.Description>
            Anyone with the link can view this project. You can revoke access at any time.
          </Sheet.Description>
        </Sheet.Header>
        <Sheet.Footer>
          <Sheet.Close>Done</Sheet.Close>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  ),
}

export const Sides: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Sheets can slide in from the right, left, top, or bottom edges.',
      },
    },
  },
  render: () => (
    <div style={rowStyle}>
      {sides.map((side) => (
        <SideSheet key={side} side={side} />
      ))}
    </div>
  ),
}

export const Sizes: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Sheets support small, medium, and large sizing.',
      },
    },
  },
  render: () => (
    <div style={rowStyle}>
      {sizes.map((size) => (
        <SizeSheet key={size} size={size} />
      ))}
    </div>
  ),
}

export const Scrollable: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Sheets with pinned header and footer areas around scrollable body content.',
      },
    },
  },
  render: () => (
    <Sheet>
      <Sheet.Trigger>
        <Button variant="outline">Read terms</Button>
      </Sheet.Trigger>
      <Sheet.Content size="large">
        <Sheet.Header>
          <Sheet.Title>Terms of service</Sheet.Title>
          <Sheet.Description>
            The header and footer stay in view while the sections scroll.
          </Sheet.Description>
        </Sheet.Header>
        {Array.from({ length: 16 }, (_, index) => (
          <p key={index} style={{ margin: 0 }}>
            Section {index + 1}: Access to the service is granted for the duration of your
            subscription. You are responsible for keeping your credentials secure and for all
            activity that occurs under your account.
          </p>
        ))}
        <Sheet.Footer>
          <Sheet.Close>Decline</Sheet.Close>
          <Button variant="primary">Accept</Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  ),
}

export const Form: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Sheets can contain form inputs and actions.',
      },
    },
  },
  render: () => <FormSheet />,
}

export const Nested: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Sheets can be nested within each other to handle multi-level flows.',
      },
    },
  },
  render: () => <NestedSheets />,
}

export const Controlled: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Sheets support controlled open state management.',
      },
    },
  },
  render: () => <ControlledSheet />,
}

export const Custom: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Sheets support custom behavior such as disabling backdrop click dismissal.',
      },
    },
  },
  render: () => (
    <Sheet side="left">
      <Sheet.Trigger>
        <Button variant="secondary">Open activity</Button>
      </Sheet.Trigger>
      <Sheet.Content size="small" closeOnBackdropClick={false}>
        <Sheet.Header>
          <Sheet.Title>Recent activity</Sheet.Title>
          <Sheet.Description>
            Backdrop clicks are disabled for this sheet. Use Escape or a button to dismiss it.
          </Sheet.Description>
        </Sheet.Header>
        <div style={demoPanelStyle}>
          <p style={{ margin: 0 }}>Project renamed to One.</p>
          <p style={{ margin: 0 }}>Design tokens updated.</p>
          <p style={{ margin: 0 }}>Sheet component added.</p>
        </div>
        <Sheet.Footer>
          <Sheet.Close variant="outline">Dismiss</Sheet.Close>
          <Button variant="primary">View all</Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  ),
}
