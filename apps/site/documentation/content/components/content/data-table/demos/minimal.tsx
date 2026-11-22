import { DataTable } from '@rayscale/frontier'
import type { ColumnDef, TDataTableFeatures } from '@rayscale/frontier'

interface TPerson {
  name: string
  role: string
}

const columns: ColumnDef<TDataTableFeatures, TPerson>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
]

export default function Minimal() {
  return (
    <DataTable
      columns={columns}
      data={[
        { name: 'Ana', role: 'Designer' },
        { name: 'Jorge', role: 'Engineer' },
      ]}
      enableColumnVisibility={false}
      enablePagination={false}
    />
  )
}
