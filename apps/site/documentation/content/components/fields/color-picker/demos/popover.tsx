import { Button, ColorPicker, Popover } from '@rayscale/frontier'

export default function PopoverDemo() {
  return (
    <ColorPicker.Root defaultValue="#2563eb">
      <Popover>
        <Popover.Trigger>
          <Button variant="outline">
            <ColorPicker.Preview size="sm" />
            Pick a color
          </Button>
        </Popover.Trigger>
        <Popover.Content align="start">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <ColorPicker.Area />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ColorPicker.EyeDropper />
              <ColorPicker.Slider channel="hue" />
            </div>
            <ColorPicker.Input label="Color" />
          </div>
        </Popover.Content>
      </Popover>
    </ColorPicker.Root>
  )
}
