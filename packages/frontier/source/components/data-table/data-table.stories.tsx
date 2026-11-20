import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ColumnDef } from '@tanstack/react-table'
import type { ReactElement } from 'react'

import { Ellipsis } from '../../icons/index.js'
import { Button } from '../button/button.js'
import { DropdownMenu } from '../dropdown-menu/dropdown-menu.js'

import { DataTableColumnHeader } from './data-table-column-header.js'
import { DataTable } from './data-table.js'
import type { TDataTableFeatures } from './features.js'
import type { TDataTableProps } from './types.js'

interface TPayment {
  id: string
  email: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
}

const payments: TPayment[] = Array.from({ length: 24 }, (_, index) => ({
  id: `728ed52f-${String(index)}`,
  email: `user${String(index + 1).padStart(2, '0')}@example.com`,
  amount: 100 + index * 17,
  status: (['pending', 'processing', 'success', 'failed'] as const)[index % 4] ?? 'pending',
}))

const columns: ColumnDef<TDataTableFeatures, TPayment>[] = [
  {
    accessorKey: 'email',
    filterFn: 'includesString',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    sortFn: 'text',
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    sortFn: 'text',
  },
  {
    accessorKey: 'amount',
    cell: ({ row }) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(row.original.amount),
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    sortFn: 'alphanumeric',
  },
]

const columnsWithActions: ColumnDef<TDataTableFeatures, TPayment>[] = [
  ...columns,
  {
    id: 'actions',
    enableHiding: false,
    header: 'Actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <Button aria-label={`Open menu for ${row.original.email}`} size="small" variant="ghost">
            <Ellipsis aria-hidden="true" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Item
            onClick={() => {
              navigator.clipboard.writeText(row.original.id).catch(() => undefined)
            }}
          >
            Copy payment ID
          </DropdownMenu.Item>
          <DropdownMenu.Item>View details</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    ),
  },
]

function PaymentDataTable(props: TDataTableProps<TPayment>): ReactElement {
  return <DataTable<TPayment> {...props} />
}

const meta = {
  title: 'Components/DataTable',
  component: PaymentDataTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (TStory) => (
      <div style={{ width: '100%', maxWidth: 860, margin: '0 auto' }}>
        <TStory />
      </div>
    ),
  ],
} satisfies Meta<typeof DataTable<TPayment>>

export default meta

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: { docs: { description: { story: 'Shows the default example of the data table.' } } },
  args: {
    columns,
    data: payments,
    filterColumn: 'email',
    pageSize: 10,
  },
}

export const WithRowSelection: TStory = {
  parameters: {
    docs: { description: { story: 'Shows the with row selection example of the data table.' } },
  },
  args: {
    columns,
    data: payments,
    enableRowSelection: true,
    filterColumn: 'email',
    pageSize: 10,
  },
}

export const WithRowActions: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Row actions are ordinary TanStack columns that render a DropdownMenu.',
      },
    },
  },
  args: {
    columns: columnsWithActions,
    data: payments,
    enableRowSelection: true,
    filterColumn: 'email',
    pageSize: 10,
  },
}

export const Empty: TStory = {
  parameters: { docs: { description: { story: 'Shows the empty example of the data table.' } } },
  args: {
    columns,
    data: [],
  },
}
