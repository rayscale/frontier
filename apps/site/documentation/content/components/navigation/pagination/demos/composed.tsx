import { Pagination } from '@rayscale/frontier'
import { useState } from 'react'

export default function Composed() {
  const [page, setPage] = useState(3)

  return (
    <Pagination page={page} pageCount={12} onPageChange={setPage} aria-label="Results pages">
      <Pagination.Previous />
      <span>Page {page} of 12</span>
      <Pagination.Next />
    </Pagination>
  )
}
