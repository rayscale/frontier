import { Pagination } from '@rayscale/frontier'

export default function Disabled() {
  return <Pagination page={3} pageCount={10} disabled aria-label="Results pages" />
}
