import { NavigationMenu } from '@rayscale/frontier'

export default function Groups() {
  return (
    <NavigationMenu aria-label="Main">
      <NavigationMenu.List>
        <NavigationMenu.Item value="platform">
          <NavigationMenu.Trigger>Platform</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Group>
              <NavigationMenu.Link href="#" closeOnClick>
                Overview
              </NavigationMenu.Link>
              <NavigationMenu.Link href="#" closeOnClick>
                Security
              </NavigationMenu.Link>
            </NavigationMenu.Group>
            <NavigationMenu.Group>
              <NavigationMenu.Link href="#" closeOnClick>
                Integrations
              </NavigationMenu.Link>
              <NavigationMenu.Link href="#" closeOnClick>
                API
              </NavigationMenu.Link>
            </NavigationMenu.Group>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>
  )
}
