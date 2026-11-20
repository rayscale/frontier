import type { Meta, StoryObj } from '@storybook/react-vite'

import { Box, Code, FileText, Folder, Home, Settings } from '../../symbols/index.js'

import { Tree } from './tree.js'
import type { TTreeNode } from './types.js'

const items: TTreeNode[] = [
  {
    id: 'home',
    label: 'Home',
    href: '#home',
    symbol: <Home aria-hidden="true" />,
  },
  {
    id: 'components',
    label: 'Components',
    symbol: <Box aria-hidden="true" />,
    children: [
      { id: 'button', label: 'Button', href: '#button' },
      { id: 'dialog', label: 'Dialog', href: '#dialog' },
      {
        id: 'data',
        label: 'Data',
        children: [
          { id: 'table', label: 'Table', href: '#table' },
          { id: 'data-table', label: 'DataTable', href: '#data-table' },
        ],
      },
    ],
  },
  {
    id: 'patterns',
    label: 'Patterns',
    symbol: <Code aria-hidden="true" />,
    children: [
      { id: 'loading', label: 'Loading', href: '#loading' },
      { id: 'selection', label: 'Selection', href: '#selection' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '#settings',
    symbol: <Settings aria-hidden="true" />,
  },
]

const meta = {
  title: 'Components/Tree',
  component: Tree,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (TStory) => (
      <div style={{ width: 320 }}>
        <TStory />
      </div>
    ),
  ],
  args: {
    'aria-label': 'Documentation',
    items,
  },
} satisfies Meta<typeof Tree>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: { docs: { description: { story: 'Shows the default example of the tree.' } } },
}

export const Active: TStory = {
  parameters: { docs: { description: { story: 'Shows the active example of the tree.' } } },
  args: {
    activeId: 'button',
  },
}

export const Expanded: TStory = {
  parameters: { docs: { description: { story: 'Shows the expanded example of the tree.' } } },
  args: {
    defaultExpandedIds: ['components', 'data'],
  },
}

export const Links: TStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Leaves with href render as native links, preserving open-in-new-tab and middle click.',
      },
    },
  },
  args: {
    activeId: 'dialog',
  },
}

export const Deep: TStory = {
  parameters: { docs: { description: { story: 'Shows the deep example of the tree.' } } },
  render: () => (
    <Tree
      aria-label="Project files"
      defaultExpandedIds={['src', 'components', 'data']}
      items={[
        {
          id: 'src',
          label: 'src',
          symbol: <Folder aria-hidden="true" />,
          children: [
            {
              id: 'components',
              label: 'components',
              symbol: <Folder aria-hidden="true" />,
              children: [
                {
                  id: 'data',
                  label: 'data',
                  symbol: <Folder aria-hidden="true" />,
                  children: [
                    {
                      id: 'table',
                      label: 'table.tsx',
                      href: '#table',
                      symbol: <FileText aria-hidden="true" />,
                    },
                    {
                      id: 'data-table',
                      label: 'data-table.tsx',
                      href: '#data-table',
                      symbol: <FileText aria-hidden="true" />,
                    },
                  ],
                },
                {
                  id: 'button',
                  label: 'button.tsx',
                  href: '#button',
                  symbol: <FileText aria-hidden="true" />,
                },
              ],
            },
          ],
        },
        {
          id: 'package',
          label: 'package.json',
          href: '#package',
          symbol: <FileText aria-hidden="true" />,
        },
      ]}
    />
  ),
}
