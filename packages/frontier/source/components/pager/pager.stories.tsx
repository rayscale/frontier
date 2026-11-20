import type { Meta, StoryObj } from '@storybook/react-vite'

import { Pager } from './pager.js'

const meta = {
  title: 'Components/Pager',
  component: Pager,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (TStory) => (
      <div style={{ width: 640 }}>
        <TStory />
      </div>
    ),
  ],
  args: {
    previous: {
      href: '#installation',
      label: 'Installation',
    },
    next: {
      href: '#components',
      label: 'Components',
    },
  },
} satisfies Meta<typeof Pager>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {}

export const PreviousOnly: TStory = {
  args: {
    next: undefined,
  },
}

export const NextOnly: TStory = {
  args: {
    previous: undefined,
  },
}

export const CustomLabels: TStory = {
  args: {
    previousLabel: 'Anterior',
    nextLabel: 'Siguiente',
  },
}
