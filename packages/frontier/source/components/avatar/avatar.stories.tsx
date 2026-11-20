import type { Meta, StoryObj } from '@storybook/react-vite'

import { CircleHelp, UserRound } from '../../symbols/index.js'

import { Avatar } from './avatar.js'

const avatarSizes = ['small', 'medium', 'large', 'extra-large'] as const

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'medium',
  },
  argTypes: {
    size: {
      control: 'select',
      options: avatarSizes,
      description: 'The size of the avatar.',
    },
  },
} satisfies Meta<typeof Avatar>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'The default avatar displays a built-in symbol when no image or fallback is provided.',
      },
    },
  },
}

export const Image: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Avatars can display a user-supplied image.',
      },
    },
  },
  render: () => (
    <Avatar>
      <Avatar.Image src="https://i.pravatar.cc/120?img=12" alt="Max Perez" />
      <Avatar.Fallback>MX</Avatar.Fallback>
    </Avatar>
  ),
}

export const Initials: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Text fallback can be used when an image is unavailable.',
      },
    },
  },
  render: () => (
    <Avatar>
      <Avatar.Fallback>AP</Avatar.Fallback>
    </Avatar>
  ),
}

export const Symbol: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Symbols can be used as fallback content.',
      },
    },
  },
  render: () => (
    <Avatar>
      <Avatar.Fallback>
        <UserRound aria-hidden="true" />
      </Avatar.Fallback>
    </Avatar>
  ),
}

export const CustomFallback: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Avatars support custom fallback content and sizes.',
      },
    },
  },
  render: () => (
    <Avatar size="large">
      <Avatar.Fallback>
        <CircleHelp aria-hidden="true" />
        <span>?</span>
      </Avatar.Fallback>
    </Avatar>
  ),
}

export const Sizes: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Avatars are available in several sizes.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {avatarSizes.map((size) => (
        <Avatar key={size} size={size} aria-label={`${size} avatar`}>
          <Avatar.Fallback>
            {size === 'extra-large' ? 'XL' : size.slice(0, 2).toUpperCase()}
          </Avatar.Fallback>
        </Avatar>
      ))}
    </div>
  ),
}

export const BrokenLink: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'The fallback is displayed when the image source is missing.',
      },
    },
  },
  render: () => (
    <Avatar>
      <Avatar.Image alt="Jamie Chen" />
      <Avatar.Fallback>JC</Avatar.Fallback>
    </Avatar>
  ),
}

export const Error: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'The fallback is displayed when the image fails to load.',
      },
    },
  },
  render: () => (
    <Avatar>
      <Avatar.Image src="/missing-avatar.png" alt="Riley Smith" />
      <Avatar.Fallback>RS</Avatar.Fallback>
    </Avatar>
  ),
}
