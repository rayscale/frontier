import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../../index.js'

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      style={{
        width: 'var(--frontier-icon-size-control)',
        height: 'var(--frontier-icon-size-control)',
      }}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Triggers one action with a label that names the result.',
      },
    },
  },
  args: {
    children: 'Save changes',
    variant: 'primary',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'The visual role of the action.',
    },
    disabled: {
      control: 'boolean',
      description: 'Keeps the action focusable while preventing activation.',
    },
    disabledReason: {
      control: 'text',
      description: 'Explains why the action is unavailable. Required when disabled.',
    },
    iconOnly: {
      control: false,
      description: 'Uses a rounded control for an icon-only action.',
    },
    asChild: {
      control: false,
      description: 'Renders the child element with button styles and behavior.',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>

export default meta

type TStory = StoryObj<typeof meta>

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 'var(--frontier-spacing-3)',
} as const

export const Default: TStory = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story: 'Shows the primary action with its default label.',
      },
    },
  },
}

export const Variants: TStory = {
  name: 'Variants',
  parameters: {
    docs: {
      description: {
        story: 'Shows the four action roles at the same hierarchy level.',
      },
    },
  },
  render: () => (
    <div style={rowStyle}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Delete file</Button>
    </div>
  ),
}

export const Disabled: TStory = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: {
        story: 'Keeps the action reachable while explaining why it cannot run.',
      },
    },
  },
  args: {
    disabled: true,
    disabledReason: 'You need permission to save changes.',
  },
}

export const IconOnly: TStory = {
  name: 'Icon only',
  parameters: {
    docs: {
      description: {
        story: 'Shows icon-only actions with an accessible name and a hover title.',
      },
    },
  },
  render: () => (
    <div style={rowStyle}>
      <Button iconOnly aria-label="Add item">
        <PlusIcon />
      </Button>
      <Button iconOnly variant="secondary" aria-label="Add item">
        <PlusIcon />
      </Button>
      <Button iconOnly variant="ghost" aria-label="Add item">
        <PlusIcon />
      </Button>
    </div>
  ),
}

export const AsLink: TStory = {
  name: 'As link',
  parameters: {
    docs: {
      description: {
        story: 'Renders an anchor with button styles while preserving link semantics.',
      },
    },
  },
  render: () => (
    <Button asChild variant="secondary">
      <a href="#documentation">Open documentation</a>
    </Button>
  ),
}

export const LongLabel: TStory = {
  name: 'Long label',
  parameters: {
    docs: {
      description: {
        story: 'Grows with a longer action label without changing its height.',
      },
    },
  },
  args: {
    children: 'Continue to checkout',
  },
}

export const Actions: TStory = {
  name: 'Actions',
  parameters: {
    docs: {
      description: {
        story: 'Composes a secondary and a primary action in a form footer.',
      },
    },
  },
  render: () => (
    <div aria-label="Form actions" role="group" style={rowStyle}>
      <Button variant="secondary">Cancel</Button>
      <Button>Save changes</Button>
    </div>
  ),
}
