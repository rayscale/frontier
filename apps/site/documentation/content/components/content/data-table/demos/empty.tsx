import { DataTable } from '@rayscale/frontier'
import type { ColumnDef, TDataTableFeatures } from '@rayscale/frontier'

interface TPerson {
  name: string
}

const columns: ColumnDef<TDataTableFeatures, TPerson>[] = [{ accessorKey: 'name', header: 'Name' }]

export default function Empty() {
  return (
    <DataTable
      columns={columns}
      data={[]}
      emptyState="Nobody has joined yet."
      enablePagination={false}
    />
  )
}
