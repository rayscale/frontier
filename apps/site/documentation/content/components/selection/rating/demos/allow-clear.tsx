import { Rating } from '@rayscale/frontier'

export default function AllowClear() {
  return <Rating allowClear label="Rate this recipe" defaultValue={4} />
}
