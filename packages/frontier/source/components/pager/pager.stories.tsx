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

export const Default: TStory = {
  parameters: { docs: { description: { story: 'Shows the default example of the pager.' } } },
}

export const PreviousOnly: TStory = {
  parameters: { docs: { description: { story: 'Shows the previous only example of the pager.' } } },
  args: {
    next: undefined,
  },
}

export const NextOnly: TStory = {
  parameters: { docs: { description: { story: 'Shows the next only example of the pager.' } } },
  args: {
    previous: undefined,
  },
}

export const CustomLabels: TStory = {
  parameters: { docs: { description: { story: 'Shows the custom labels example of the pager.' } } },
  args: {
    previousLabel: 'Anterior',
    nextLabel: 'Siguiente',
  },
}
