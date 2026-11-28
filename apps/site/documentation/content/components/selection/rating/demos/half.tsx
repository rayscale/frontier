import { Rating } from '@rayscale/frontier'

export default function Half() {
  return <Rating label="Rate this recipe" defaultValue={3.5} precision={0.5} />
}
