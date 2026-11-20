import type { Meta, StoryObj } from '@storybook/react-vite'

import { CodeBlock } from '../code-block/code-block.js'

import { Disclosure } from './disclosure.js'

const meta = {
  title: 'Components/Disclosure',
  component: Disclosure,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (TStory) => (
      <div style={{ width: 520 }}>
        <TStory />
      </div>
    ),
  ],
  args: {
    title: 'Shipping details',
    children: <p>Ships within two business days.</p>,
  },
} satisfies Meta<typeof Disclosure>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: { docs: { description: { story: 'Shows the default example of the disclosure.' } } },
}

export const OpenByDefault: TStory = {
  parameters: {
    docs: { description: { story: 'Shows the open by default example of the disclosure.' } },
  },
  args: {
    defaultOpen: true,
  },
}

export const Disabled: TStory = {
  parameters: { docs: { description: { story: 'Shows the disabled example of the disclosure.' } } },
  args: {
    disabled: true,
  },
}

export const WithCode: TStory = {
  parameters: {
    docs: { description: { story: 'Shows the with code example of the disclosure.' } },
  },
  args: {
    title: 'SVG markup',
    children: (
      <CodeBlock>
        <CodeBlock.Content>{`<svg viewBox="0 0 24 24">…</svg>`}</CodeBlock.Content>
      </CodeBlock>
    ),
  },
}
