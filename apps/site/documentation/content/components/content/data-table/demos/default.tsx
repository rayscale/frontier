import { DataTable, DataTableColumnHeader } from '@rayscale/frontier'
import type { ColumnDef, TDataTableFeatures } from '@rayscale/frontier'

interface TPayment {
  email: string
  amount: number
  status: string
}

const payments: TPayment[] = Array.from({ length: 24 }, (_, index) => ({
  email: `user${String(index + 1).padStart(2, '0')}@example.com`,
  amount: 100 + index * 17,
  status: ['Pending', 'Processing', 'Paid', 'Failed'][index % 4] ?? 'Pending',
}))

const columns: ColumnDef<TDataTableFeatures, TPayment>[] = [
  {
    accessorKey: 'email',
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
    cell: ({ row }) => `$${String(row.original.amount)}.00`,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    sortFn: 'alphanumeric',
  },
]

export default function Default() {
  return <DataTable columns={columns} data={payments} />
}
