import { forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import type {
  TTableAlign,
  TTableBodyProps,
  TTableCaptionProps,
  TTableCellProps,
  TTableFooterProps,
  TTableHeaderProps,
  TTableHeadProps,
  TTableProps,
  TTableRowProps,
} from '../types.js'

function alignClass(prefix: string, align: TTableAlign | undefined) {
  return align && align !== 'start' ? `${prefix}--${align}` : undefined
}

export const TableRoot = forwardRef<HTMLTableElement, TTableProps>(function TableRoot(
  { children, className, containerClassName, ...props },
  ref,
) {
  return (
    <div className={classNames('frontier-table__scroll', containerClassName)}>
      <table ref={ref} className={classNames('frontier-table', className)} {...props}>
        {children}
      </table>
    </div>
  )
})

export const TableCaption = forwardRef<HTMLTableCaptionElement, TTableCaptionProps>(
  function TableCaption({ className, ...props }, ref) {
    return (
      <caption ref={ref} className={classNames('frontier-table__caption', className)} {...props} />
    )
  },
)

export const TableHeader = forwardRef<HTMLTableSectionElement, TTableHeaderProps>(
  function TableHeader({ className, ...props }, ref) {
    return (
      <thead ref={ref} className={classNames('frontier-table__header', className)} {...props} />
    )
  },
)

export const TableBody = forwardRef<HTMLTableSectionElement, TTableBodyProps>(function TableBody(
  { className, ...props },
  ref,
) {
  return <tbody ref={ref} className={classNames('frontier-table__body', className)} {...props} />
})

export const TableFooter = forwardRef<HTMLTableSectionElement, TTableFooterProps>(
  function TableFooter({ className, ...props }, ref) {
    return (
      <tfoot ref={ref} className={classNames('frontier-table__footer', className)} {...props} />
    )
  },
)

export const TableRow = forwardRef<HTMLTableRowElement, TTableRowProps>(function TableRow(
  { className, selected = false, ...props },
  ref,
) {
  return (
    <tr
      ref={ref}
      data-state={selected ? 'selected' : undefined}
      className={classNames('frontier-table__row', className)}
      {...props}
    />
  )
})

export const TableHead = forwardRef<HTMLTableCellElement, TTableHeadProps>(function TableHead(
  { align = 'start', className, scope = 'col', sort, ...props },
  ref,
) {
  return (
    <th
      ref={ref}
      scope={scope}
      aria-sort={sort}
      className={classNames(
        'frontier-table__head',
        alignClass('frontier-table__head', align),
        className,
      )}
      {...props}
    />
  )
})

export const TableCell = forwardRef<HTMLTableCellElement, TTableCellProps>(function TableCell(
  { align = 'start', className, ...props },
  ref,
) {
  return (
    <td
      ref={ref}
      className={classNames(
        'frontier-table__cell',
        alignClass('frontier-table__cell', align),
        className,
      )}
      {...props}
    />
  )
})
