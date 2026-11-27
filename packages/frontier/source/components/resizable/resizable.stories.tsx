import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties, ReactNode } from 'react'

import { Resizable } from './resizable.js'

const frameStyle: CSSProperties = {
  width: '36rem',
  maxWidth: '100%',
  height: '16rem',
  border: 'var(--frontier-border-width) solid var(--frontier-color-border)',
  borderRadius: 'var(--frontier-radius-lg)',
  overflow: 'hidden',
}

const contentStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: 'var(--frontier-spacing-4)',
  boxSizing: 'border-box',
  fontWeight: 'var(--frontier-font-weight-semibold)',
}

function Frame({ children }: { children: ReactNode }) {
  return <div style={frameStyle}>{children}</div>
}

function Content({ children }: { children: ReactNode }) {
  return <div style={contentStyle}>{children}</div>
}

const meta = {
  title: 'Components/Resizable',
  component: Resizable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Panels that people resize by dragging the handle between them or by focusing it and using the arrow keys. Compose it with `Resizable.Root`, `Resizable.Panel`, and `Resizable.Handle`.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Direction in which panels sit side by side.',
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents every panel from being resized.',
    },
    defaultLayout: { control: false },
    onLayoutChange: { control: false },
  },
} satisfies Meta<typeof Resizable>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Two panels side by side with a handle between them.',
      },
    },
  },
  render: (args) => (
    <Frame>
      <Resizable.Root {...args}>
        <Resizable.Panel defaultSize={50} minSize={20}>
          <Content>One</Content>
        </Resizable.Panel>
        <Resizable.Handle aria-label="Resize panels" />
        <Resizable.Panel defaultSize={50} minSize={20}>
          <Content>Two</Content>
        </Resizable.Panel>
      </Resizable.Root>
    </Frame>
  ),
}

export const Grip: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Shows a grip on the handle so it is easy to spot and grab.',
      },
    },
  },
  render: (args) => (
    <Frame>
      <Resizable.Root {...args}>
        <Resizable.Panel defaultSize={50} minSize={20}>
          <Content>One</Content>
        </Resizable.Panel>
        <Resizable.Handle grip aria-label="Resize panels" />
        <Resizable.Panel defaultSize={50} minSize={20}>
          <Content>Two</Content>
        </Resizable.Panel>
      </Resizable.Root>
    </Frame>
  ),
}

export const Vertical: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Stacks the panels in a column with `orientation="vertical"`.',
      },
    },
  },
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <Frame>
      <Resizable.Root {...args}>
        <Resizable.Panel defaultSize={30} minSize={15}>
          <Content>Header</Content>
        </Resizable.Panel>
        <Resizable.Handle grip aria-label="Resize header" />
        <Resizable.Panel defaultSize={70} minSize={15}>
          <Content>Content</Content>
        </Resizable.Panel>
      </Resizable.Root>
    </Frame>
  ),
}

export const Nested: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Nests a vertical group inside a horizontal one to build a split layout.',
      },
    },
  },
  render: () => (
    <Frame>
      <Resizable.Root>
        <Resizable.Panel defaultSize={30} minSize={15}>
          <Content>Sidebar</Content>
        </Resizable.Panel>
        <Resizable.Handle grip aria-label="Resize sidebar" />
        <Resizable.Panel defaultSize={70} minSize={30}>
          <Resizable.Root orientation="vertical">
            <Resizable.Panel defaultSize={60} minSize={20}>
              <Content>Editor</Content>
            </Resizable.Panel>
            <Resizable.Handle grip aria-label="Resize editor" />
            <Resizable.Panel defaultSize={40} minSize={20}>
              <Content>Terminal</Content>
            </Resizable.Panel>
          </Resizable.Root>
        </Resizable.Panel>
      </Resizable.Root>
    </Frame>
  ),
}

export const Collapsible: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Collapses the sidebar when it is dragged below its minimum size, and expands it again when it is dragged back.',
      },
    },
  },
  render: () => (
    <Frame>
      <Resizable.Root>
        <Resizable.Panel defaultSize={30} minSize={20} collapsible collapsedSize={0}>
          <Content>Sidebar</Content>
        </Resizable.Panel>
        <Resizable.Handle grip aria-label="Resize sidebar" />
        <Resizable.Panel defaultSize={70}>
          <Content>Content</Content>
        </Resizable.Panel>
      </Resizable.Root>
    </Frame>
  ),
}

export const Pixels: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Sizes a panel with units. The sidebar starts at 12rem and stays between 8rem and 20rem; the content takes the rest.',
      },
    },
  },
  render: () => (
    <Frame>
      <Resizable.Root>
        <Resizable.Panel defaultSize="12rem" minSize="8rem" maxSize="20rem">
          <Content>Sidebar</Content>
        </Resizable.Panel>
        <Resizable.Handle grip aria-label="Resize sidebar" />
        <Resizable.Panel>
          <Content>Content</Content>
        </Resizable.Panel>
      </Resizable.Root>
    </Frame>
  ),
}

export const Disabled: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Keeps the layout fixed. The handle stays visible but does not respond.',
      },
    },
  },
  args: {
    disabled: true,
  },
  render: (args) => (
    <Frame>
      <Resizable.Root {...args}>
        <Resizable.Panel defaultSize={50}>
          <Content>One</Content>
        </Resizable.Panel>
        <Resizable.Handle grip aria-label="Resize panels" />
        <Resizable.Panel defaultSize={50}>
          <Content>Two</Content>
        </Resizable.Panel>
      </Resizable.Root>
    </Frame>
  ),
}
