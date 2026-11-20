import type { Meta, StoryObj } from '@storybook/react-vite'
import { type ReactNode, useState } from 'react'

import { Archive, FilePlus, Settings } from '../../symbols/index.js'
import { Button } from '../button/button.js'

import { Command, type TCommandGroup, type TCommandItem } from './command.js'

function createNoteCommands(onSelect?: (value: string) => void) {
  const newNote: TCommandItem = {
    value: 'new-note',
    label: 'New note',
    description: 'Create a blank note in the current folder',
    keywords: ['create', 'add'],
    symbol: <FilePlus size={16} />,
    shortcut: ['Mod', 'N'],
    onSelect: () => onSelect?.('new-note'),
  }
  const openSettings: TCommandItem = {
    value: 'open-settings',
    label: 'Open settings',
    symbol: <Settings size={16} />,
    shortcut: ['Mod', ','],
    onSelect: () => onSelect?.('open-settings'),
  }
  const archiveNote: TCommandItem = {
    value: 'archive-note',
    label: 'Archive note',
    description: 'Not available in the trash folder',
    symbol: <Archive size={16} />,
    disabled: true,
    onSelect: () => onSelect?.('archive-note'),
  }

  return { newNote, openSettings, archiveNote }
}

const flatItems = (() => {
  const { newNote, openSettings, archiveNote } = createNoteCommands()
  return [newNote, openSettings, archiveNote]
})()

const groupedItems: TCommandGroup[] = (() => {
  const { newNote, openSettings, archiveNote } = createNoteCommands()
  return [
    { label: 'Notes', items: [newNote, archiveNote] },
    { label: 'Application', items: [openSettings] },
  ]
})()

const meta = {
  title: 'Components/Command',
  component: Command,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    items: flatItems,
  },
} satisfies Meta<typeof Command>

export default meta

type TStory = StoryObj<typeof meta>

interface TPaletteTriggerProps {
  items: readonly TCommandItem[] | readonly TCommandGroup[]
  shortcut?: string | null
  label?: string
  children?: ReactNode
}

function PaletteTrigger({ items, shortcut = null, label, children }: TPaletteTriggerProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Open palette
      </Button>
      <Command.Dialog
        items={items}
        open={open}
        onOpenChange={setOpen}
        shortcut={shortcut}
        label={label}
      >
        {children}
      </Command.Dialog>
    </>
  )
}

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'The default command palette with flat items.',
      },
    },
  },
  render: (args) => <PaletteTrigger items={args.items} />,
}

export const Groups: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Commands can be organized into labeled groups.',
      },
    },
  },
  args: {
    items: groupedItems,
  },
  render: (args) => <PaletteTrigger items={args.items} />,
}

export const Shortcut: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Command dialogs can be opened using keyboard shortcuts such as `Mod+K`.',
      },
    },
  },
  render: (args) => <PaletteTrigger items={args.items} shortcut="Mod+K" label="Command palette" />,
}

export const CustomShortcut: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Custom keyboard shortcuts can be bound to open the dialog.',
      },
    },
  },
  render: (args) => <PaletteTrigger items={args.items} shortcut="Alt+P" label="Quick actions" />,
}

export const Controlled: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Command dialogs support controlled open state and item selection tracking.',
      },
    },
  },
  render: () => <ControlledDialogDemo />,
}

function ControlledDialogDemo() {
  const [open, setOpen] = useState(false)
  const [lastSelected, setLastSelected] = useState<string | null>(null)
  const { newNote, openSettings, archiveNote } = createNoteCommands(setLastSelected)

  return (
    <div style={{ display: 'grid', gap: '1rem', justifyItems: 'start' }}>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Open palette
      </Button>
      <p>Last selected: {lastSelected ?? 'none'}</p>
      <Command.Dialog
        items={[newNote, openSettings, archiveNote]}
        open={open}
        onOpenChange={setOpen}
        shortcut={null}
      />
    </div>
  )
}

export const Resizing: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Command dialogs automatically animate their height as search results change.',
      },
    },
  },
  render: (args) => <PaletteTrigger items={args.items} />,
}

export const Empty: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Custom empty states are displayed when no commands match the search query.',
      },
    },
  },
  render: (args) => (
    <PaletteTrigger items={args.items}>
      <Command.Input />
      <Command.List />
      <Command.Empty>Nothing matches. Try a different word.</Command.Empty>
    </PaletteTrigger>
  ),
}

export const Composed: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Commands can be composed manually with subcomponents.',
      },
    },
  },
  args: {
    items: groupedItems,
  },
  render: (args) => (
    <PaletteTrigger items={args.items}>
      <Command.Input placeholder="Type a command" />
      <Command.List>{(item: TCommandItem) => <Command.Item item={item} />}</Command.List>
      <Command.Empty />
    </PaletteTrigger>
  ),
}
