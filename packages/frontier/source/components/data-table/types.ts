import type { Column, ColumnDef, ReactTable, RowData } from '@tanstack/react-table'
import type { ReactNode } from 'react'

import type { TDataTableFeatures } from './features.js'

export interface TDataTableColumnHeaderProps<TData extends RowData, TValue = unknown> {
  /** Column whose sorting state is controlled by the header. */
  column: Column<TDataTableFeatures, TData, TValue>
  /** Visible header label. */
  title: string
}

export interface TDataTableViewOptionsProps<TData extends RowData> {
  /** Table instance created by {@link DataTable}. */
  table: ReactTable<TDataTableFeatures, TData>
  /** Trigger label. Defaults to `View`. */
  label?: string | undefined
  /** Additional class for the trigger button. */
  className?: string | undefined
}

export interface TDataTablePaginationProps<TData extends RowData> {
  /** Table instance created by {@link DataTable}. */
  table: ReactTable<TDataTableFeatures, TData>
  /** Available page sizes. Defaults to 10, 20, 25, 30, 40, and 50. */
  pageSizeOptions?: number[] | undefined
}

export interface TDataTableProps<TData extends RowData> {
  /** Column definitions from TanStack Table. */
  columns: ColumnDef<TDataTableFeatures, TData>[]
  /** Rows rendered by the table. */
  data: TData[]
  /** Column used by the default filter input. Omit to hide the input. */
  filterColumn?: string | undefined
  /** Placeholder and accessible name of the filter input. */
  filterPlaceholder?: string | undefined
  /** Adds a checkbox column and enables row selection. Defaults to `false`. */
  enableRowSelection?: boolean | undefined
  /** Shows the column visibility menu. Defaults to `true`. */
  enableColumnVisibility?: boolean | undefined
  /** Shows the pagination controls. Defaults to `true`. */
  enablePagination?: boolean | undefined
  /** Initial page size. Defaults to `10`. */
  pageSize?: number | undefined
  /** Page sizes offered by the pagination control. */
  pageSizeOptions?: number[] | undefined
  /** Replaces the default empty state. */
  emptyState?: ReactNode | undefined
  /** Replaces the default toolbar. */
  toolbar?: ((table: ReactTable<TDataTableFeatures, TData>) => ReactNode) | undefined
}
