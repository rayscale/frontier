import { DataTable, DataTableColumnHeader } from '@rayscale/frontier'
import type { ColumnDef, TDataTableFeatures } from '@rayscale/frontier'

interface TPerson {
  name: string
  role: string
}

const people: TPerson[] = [
  { name: 'Ana', role: 'Designer' },
  { name: 'Jorge', role: 'Engineer' },
  { name: 'Kim', role: 'Engineer' },
  { name: 'Dana', role: 'Writer' },
]

const columns: ColumnDef<TDataTableFeatures, TPerson>[] = [
  {
    accessorKey: 'name',
    filterFn: 'includesString',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    sortFn: 'text',
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    sortFn: 'text',
  },
]

export default function FilterAndSelection() {
  return (
    <DataTable
      columns={columns}
      data={people}
      filterColumn="name"
      filterPlaceholder="Filter names"
      enableRowSelection
    />
  )
}
