import { Switch } from '@rayscale/frontier'

export default function WithDescription() {
  return (
    <Switch
      label="Notifications"
      description="Get a message when someone replies to your comment."
      defaultChecked
    />
  )
}
