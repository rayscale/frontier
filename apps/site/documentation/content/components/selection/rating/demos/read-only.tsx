import { Rating } from '@rayscale/frontier'

export default function ReadOnly() {
  return <Rating readOnly label="Average rating" defaultValue={4.5} precision={0.5} />
}
