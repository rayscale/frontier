import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { assertDefined } from '../../internal/helpers/assert-defined.js'
import {
  Activity,
  Bell,
  Box,
  CircleHelp,
  Folder,
  Home,
  Settings,
  SquarePen,
  UserRound,
} from '../../symbols/index.js'
import { Avatar } from '../avatar/avatar.js'

import { Sidebar } from './sidebar.js'

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Sidebar.Root>

export default meta

type TStory = StoryObj<typeof meta>

function SidebarExample({ defaultOpen = true }: { defaultOpen?: boolean }) {
  return (
    <Sidebar.Root defaultOpen={defaultOpen}>
      <Sidebar.Header>
        <Sidebar.Brand symbol={<Box aria-hidden="true" />}>One</Sidebar.Brand>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.Item href="#overview" symbol={<Home aria-hidden="true" />} active>
                  Overview
                </Sidebar.Item>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.Item href="#activity" symbol={<Activity aria-hidden="true" />}>
                  Activity
                </Sidebar.Item>
                <Sidebar.MenuBadge>
                  <span aria-hidden="true">3</span>
                  <span className="frontier-sidebar__sr-only">3 unread updates</span>
                </Sidebar.MenuBadge>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.Item href="#notifications" symbol={<Bell aria-hidden="true" />}>
                  Notifications
                </Sidebar.Item>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Sidebar.Group>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
          <Sidebar.GroupAction aria-label="Create project">
            <SquarePen aria-hidden="true" />
          </Sidebar.GroupAction>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.Submenu label="Design system" symbol={<Folder aria-hidden="true" />}>
                  <Sidebar.SubmenuItem href="#foundations">Foundations</Sidebar.SubmenuItem>
                  <Sidebar.SubmenuItem href="#components">Components</Sidebar.SubmenuItem>
                </Sidebar.Submenu>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <Sidebar.Item href="#help" symbol={<CircleHelp aria-hidden="true" />}>
              Help and support
            </Sidebar.Item>
          </Sidebar.MenuItem>
          <Sidebar.MenuItem>
            <Sidebar.Item href="#settings" symbol={<Settings aria-hidden="true" />}>
              Settings
            </Sidebar.Item>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <Sidebar.Item
              href="#profile"
              symbol={
                <Avatar size="small">
                  <Avatar.Fallback aria-hidden="true">
                    <UserRound />
                  </Avatar.Fallback>
                </Avatar>
              }
            >
              Jordan Davis
            </Sidebar.Item>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
        <Sidebar.Trigger />
      </Sidebar.Footer>
      <Sidebar.Inset>
        <main style={{ padding: '2rem' }}>
          <Sidebar.Trigger />
          <h1>Overview</h1>
          <p>Your workspace, at a glance.</p>
        </main>
      </Sidebar.Inset>
    </Sidebar.Root>
  )
}

export const Default: TStory = {
  render: () => <SidebarExample />,
  parameters: {
    docs: {
      description: {
        story:
          'A composed sidebar with grouped navigation, a nested project list, and a user footer.',
      },
    },
  },
}

export const Collapsed: TStory = {
  render: () => <SidebarExample defaultOpen={false} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sidebar = canvas.getByRole('navigation', { name: 'Sidebar' })
    const brand = canvasElement.querySelector<HTMLElement>('.frontier-sidebar__brand')
    const brandSymbol = brand?.querySelector<HTMLElement>('.frontier-sidebar__brand-symbol')
    const items = [
      canvas.getByRole('link', { name: 'Overview' }),
      canvas.getByRole('button', { name: 'Design system' }),
    ]

    if (!brand || !brandSymbol) {
      throw new Error('Expected the collapsed sidebar brand to have a symbol.')
    }

    const brandBounds = brand.getBoundingClientRect()
    const brandSymbolBounds = brandSymbol.getBoundingClientRect()
    await expect(
      Math.abs(
        brandBounds.left +
          brandBounds.width / 2 -
          (brandSymbolBounds.left + brandSymbolBounds.width / 2),
      ),
      'brand symbol horizontal alignment',
    ).toBeLessThan(2)

    const itemSymbols = items.map((item) => {
      const symbol = item.querySelector<HTMLElement>('.frontier-sidebar__item-symbol')

      if (!symbol) {
        throw new Error('Expected each collapsed sidebar option to have a symbol.')
      }

      return { item, symbol }
    })
    const activeWidthTransition = () =>
      sidebar
        .getAnimations()
        .find(
          (animation): animation is CSSTransition =>
            animation instanceof CSSTransition &&
            animation.transitionProperty === 'width' &&
            animation.playState === 'running',
        )

    for (const { item, symbol } of itemSymbols) {
      const { height, width, left, top } = item.getBoundingClientRect()
      const symbolBounds = symbol.getBoundingClientRect()

      await expect(width).toBeGreaterThanOrEqual(38)
      await expect(
        Math.abs(width - height),
        `option size: ${String(width)}x${String(height)}`,
      ).toBeLessThan(1)
      await expect(
        Math.abs(left + width / 2 - (symbolBounds.left + symbolBounds.width / 2)),
        'symbol horizontal alignment',
      ).toBeLessThan(2)
      await expect(
        Math.abs(top + height / 2 - (symbolBounds.top + symbolBounds.height / 2)),
        'symbol vertical alignment',
      ).toBeLessThan(1)
      await expect(getComputedStyle(item).aspectRatio).not.toBe('auto')
    }

    await userEvent.click(within(sidebar).getByRole('button', { name: 'Expand sidebar' }))
    await activeWidthTransition()?.finished
    const brandOffsetBeforeClose =
      brandSymbol.getBoundingClientRect().left +
      brandSymbol.getBoundingClientRect().width / 2 -
      sidebar.getBoundingClientRect().left
    const symbolOffsetsBeforeClose = itemSymbols.map(({ item, symbol }) => {
      const itemLeft = item.getBoundingClientRect().left
      const symbolBounds = symbol.getBoundingClientRect()
      return symbolBounds.left + symbolBounds.width / 2 - itemLeft
    })
    await userEvent.click(within(sidebar).getByRole('button', { name: 'Collapse sidebar' }))
    const brandOffsetAfterClose =
      brandSymbol.getBoundingClientRect().left +
      brandSymbol.getBoundingClientRect().width / 2 -
      sidebar.getBoundingClientRect().left
    await expect(
      Math.abs(brandOffsetAfterClose - brandOffsetBeforeClose),
      'brand symbol should move smoothly when the sidebar closes',
    ).toBeLessThan(2)
    for (const [index, { item, symbol }] of itemSymbols.entries()) {
      const itemLeft = item.getBoundingClientRect().left
      const symbolBounds = symbol.getBoundingClientRect()
      const currentOffset = symbolBounds.left + symbolBounds.width / 2 - itemLeft
      await expect(
        Math.abs(currentOffset - assertDefined(symbolOffsetsBeforeClose[index])),
      ).toBeLessThan(10)
    }

    const closeTransition = activeWidthTransition()
    if (closeTransition) {
      const maxItemHeight = () =>
        Math.max(...items.map((item) => item.getBoundingClientRect().height))
      const heights = [maxItemHeight()]

      while (closeTransition.playState === 'running') {
        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => {
            resolve()
          })
        })
        heights.push(maxItemHeight())
      }

      await expect(Math.max(...heights)).toBeLessThanOrEqual(40)
    }

    await expect(sidebar).toHaveAttribute('data-state', 'collapsed')
    await expect(getComputedStyle(sidebar).transition).toContain('width')
  },
  parameters: {
    docs: {
      description: {
        story:
          'The sidebar can start in its compact symbol-only state and expand from either trigger.',
      },
    },
  },
}
