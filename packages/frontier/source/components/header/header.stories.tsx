import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '../button/button.js'
import { NavigationMenu } from '../navigation-menu/navigation-menu.js'

import { Header } from './header.js'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    mode: 'normal',
  },
  argTypes: {
    mode: {
      control: 'inline-radio',
      options: ['normal', 'fixed', 'dynamic'],
    },
  },
  render: (args) => (
    <Header {...args}>
      <strong>Acme Studio</strong>
      <Button variant="secondary">Sign in</Button>
    </Header>
  ),
} satisfies Meta<typeof Header>

export default meta

type TStory = StoryObj<typeof meta>

/** Scrollable content so sticky and dynamic behavior can be observed. */
function LongPage({ children }: { children: ReactNode }) {
  return (
    <div style={{ minBlockSize: '300vh' }}>
      {children}
      <div style={{ padding: 24, display: 'grid', gap: 16 }}>
        {Array.from({ length: 40 }, (_, index) => (
          <p key={index}>
            Paragraph {index + 1}. Scroll down to move the header out of view and scroll up to
            reveal it again.
          </p>
        ))}
      </div>
    </div>
  )
}

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'The default header layout with standard positioning.',
      },
    },
  },
  args: {
    mode: 'normal',
  },
}

export const Fixed: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Headers can be fixed at the top of the viewport.',
      },
    },
  },
  args: {
    mode: 'fixed',
  },
  render: (args) => (
    <LongPage>
      <Header {...args}>
        <strong>Acme Studio</strong>
        <Button variant="secondary">Sign in</Button>
      </Header>
    </LongPage>
  ),
}

export const Dynamic: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Dynamic headers stay pinned to the top, gain a surface after scrolling, hide on scroll down, and reveal on scroll up.',
      },
    },
  },
  args: {
    mode: 'dynamic',
  },
  render: (args) => (
    <LongPage>
      <Header {...args}>
        <strong>Acme Studio</strong>
        <Button variant="secondary">Sign in</Button>
      </Header>
    </LongPage>
  ),
}

/** The destinations shared by the navigation stories. */
function SiteMenuItems() {
  return (
    <NavigationMenu.List>
      <NavigationMenu.Item value="products">
        <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <NavigationMenu.Link href="#" closeOnClick>
            Editor
          </NavigationMenu.Link>
          <NavigationMenu.Link href="#" closeOnClick>
            Sync
          </NavigationMenu.Link>
          <NavigationMenu.Link href="#" closeOnClick>
            Export
          </NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item value="resources">
        <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <NavigationMenu.Group>
            <NavigationMenu.Link href="#" closeOnClick>
              Documentation
            </NavigationMenu.Link>
            <NavigationMenu.Link href="#" closeOnClick>
              Changelog
            </NavigationMenu.Link>
          </NavigationMenu.Group>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item value="pricing">
        <NavigationMenu.Link href="#" active>
          Pricing
        </NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item value="coming-soon">
        <NavigationMenu.Trigger disabled>Coming soon</NavigationMenu.Trigger>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  )
}

export const Custom: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Headers support rich navigation menus and custom brand elements.',
      },
    },
  },
  args: {
    mode: 'dynamic',
  },
  render: (args) => (
    <LongPage>
      <Header {...args}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="10" fill="currentColor" />
          </svg>
          <strong>Acme Studio</strong>
        </span>
        <NavigationMenu aria-label="Main">
          <SiteMenuItems />
        </NavigationMenu>
        <Button variant="primary">Get started</Button>
      </Header>
    </LongPage>
  ),
}

export const Responsive: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Below 48rem the navigation collapses into a menu button. The panel unfolds from the header and extends it as one surface, in every mode. Use the mode control to compare them.',
      },
    },
  },
  args: {
    mode: 'dynamic',
  },
  render: (args) => (
    <LongPage>
      <Header {...args}>
        <strong>Acme Studio</strong>
        <Header.NavigationMenu label="Main" compact>
          <SiteMenuItems />
        </Header.NavigationMenu>
      </Header>
    </LongPage>
  ),
}

export const Expanded: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'The compact panel open. The story presses the menu button when it loads, so the header and the panel can be inspected as one surface.',
      },
    },
  },
  args: {
    mode: 'dynamic',
  },
  render: (args) => (
    <LongPage>
      <Header {...args}>
        <strong>Acme Studio</strong>
        <Header.NavigationMenu label="Main" compact>
          <SiteMenuItems />
        </Header.NavigationMenu>
      </Header>
    </LongPage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole('button', { name: 'Menu' })

    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  },
}

export const Adaptive: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Without `compact`, the navigation follows the viewport: a row with dropdowns on wide screens and the panel on narrow ones. Resize the canvas to see it switch.',
      },
    },
  },
  args: {
    mode: 'dynamic',
  },
  render: (args) => (
    <LongPage>
      <Header {...args}>
        <strong>Acme Studio</strong>
        <Header.NavigationMenu label="Main">
          <SiteMenuItems />
        </Header.NavigationMenu>
        <Button variant="primary">Get started</Button>
      </Header>
    </LongPage>
  ),
}
