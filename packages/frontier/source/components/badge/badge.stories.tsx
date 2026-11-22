import type { Meta, StoryObj } from '@storybook/react-vite'

import { Check, CircleHelp, Clock, Info, Sparkles, TriangleAlert } from '../../icons/index.js'

import { Badge, type TBadgeVariant } from './badge.js'

const variants: TBadgeVariant[] = [
  'default',
  'secondary',
  'outline',
  'success',
  'warning',
  'danger',
  'info',
]

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'medium',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      description: 'The visual style of the badge.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'The size of the badge.',
    },
  },
} satisfies Meta<typeof Badge>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'The default badge style.',
      },
    },
  },
}

export const Variants: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Badges are available in multiple variants for different statuses and categories.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      {variants.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
}

export const Sizes: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Badges come in small and medium sizes.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Badge size="small">Small</Badge>
      <Badge size="medium">Medium</Badge>
    </div>
  ),
}

export const Icons: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Badges can include leading icons to reinforce status or meaning.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      <Badge variant="success">
        <Check aria-hidden="true" />
        Complete
      </Badge>
      <Badge variant="warning">
        <Clock aria-hidden="true" />
        Pending
      </Badge>
      <Badge variant="danger">
        <TriangleAlert aria-hidden="true" /> Needs attention
      </Badge>
      <Badge variant="info">
        <Info aria-hidden="true" />
        Information
      </Badge>
    </div>
  ),
}

export const Icon: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Badges can render solely with an icon for compact indicators.',
      },
    },
  },
  args: {
    children: (
      <>
        <CircleHelp aria-hidden="true" />
        <span className="frontier-badge__sr-only">More information</span>
      </>
    ),
    variant: 'info',
  },
}

export const Collection: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Badges can be grouped together to display tags or metadata.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Badge variant="secondary">Design</Badge>
      <Badge variant="info">
        <Sparkles aria-hidden="true" />
        Featured
      </Badge>
      <Badge variant="success">Published</Badge>
      <Badge variant="warning">Review</Badge>
    </div>
  ),
}

export const Modes: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Badges adapt correctly across light and dark modes.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: '16px' }}>
      {(['light', 'dark'] as const).map((mode) => (
        <div
          key={mode}
          data-mode={mode}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            padding: '16px',
            borderRadius: 'var(--frontier-radius-lg)',
            background: 'var(--frontier-color-background)',
            color: 'var(--frontier-color-text)',
          }}
        >
          {variants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
}
