import { Textarea } from '@rayscale/frontier'

export default function WithError() {
  return <Textarea label="Message" defaultValue="Hi" error="Write at least 10 characters." />
}
