import type { Meta, StoryObj } from '@storybook/react-vite'
import { type ComponentProps, useState } from 'react'

import { Pagination } from './pagination.js'

function ControlledPagination({
  page: initialPage,
  ...props
}: Omit<ComponentProps<typeof Pagination>, 'onPageChange'>) {
  const [page, setPage] = useState(initialPage)
  return <Pagination {...props} page={page} onPageChange={setPage} />
}

const meta = {
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    page: 1,
    pageCount: 12,
    siblingCount: 1,
    showFirstLast: false,
    disabled: false,
    size: 'medium',
  },
  argTypes: {
    page: {
      control: { type: 'number', min: 1 },
    },
    pageCount: {
      control: { type: 'number', min: 0 },
    },
    siblingCount: {
      control: { type: 'number', min: 0, max: 3 },
    },
    showFirstLast: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
  },
  render: (args) => <ControlledPagination {...args} />,
} satisfies Meta<typeof Pagination>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'The default pagination view with previous, items, and next controls.',
      },
    },
  },
}

export const Short: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Pagination when total page count is small.',
      },
    },
  },
  args: {
    pageCount: 4,
  },
}

export const Long: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Pagination when total page count is large, showing ellipsis ranges.',
      },
    },
  },
  args: {
    page: 10,
    pageCount: 42,
  },
}

export const Edges: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Pagination with explicit first and last page jump controls.',
      },
    },
  },
  args: {
    page: 6,
    pageCount: 20,
    showFirstLast: true,
  },
}

export const Small: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Pagination controls in a compact small size.',
      },
    },
  },
  args: {
    page: 6,
    pageCount: 20,
    size: 'small',
  },
}

export const Disabled: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Pagination disabled to prevent navigation.',
      },
    },
  },
  args: {
    page: 6,
    pageCount: 20,
    showFirstLast: true,
    disabled: true,
  },
}

export const Composed: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Pagination composed manually with custom button labels.',
      },
    },
  },
  render: () => <ComposedPagination />,
}

export const Footer: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Pagination rendered inside a list footer pattern.',
      },
    },
  },
  render: () => <ListFooterExample />,
}

function ComposedPagination() {
  const [page, setPage] = useState(3)
  return (
    <Pagination page={page} pageCount={9} onPageChange={setPage}>
      <Pagination.Previous>Previous</Pagination.Previous>
      <Pagination.Items />
      <Pagination.Next>Next</Pagination.Next>
    </Pagination>
  )
}

const listPageSize = 5

function ListFooterExample() {
  const [page, setPage] = useState(1)
  const items = Array.from({ length: listPageSize }, (_, index) => {
    return `Result ${String((page - 1) * listPageSize + index + 1)}`
  })
  return (
    <div style={{ display: 'grid', gap: '1rem', maxWidth: '28rem' }}>
      <ul style={{ margin: 0, paddingInlineStart: '1.25rem' }}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Pagination page={page} pageCount={8} onPageChange={setPage} showFirstLast />
    </div>
  )
}
