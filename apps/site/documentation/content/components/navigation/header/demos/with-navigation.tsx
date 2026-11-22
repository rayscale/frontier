import { Button, Header, NavigationMenu } from '@rayscale/frontier'

export default function WithNavigation() {
  return (
    <Header>
      <strong>Acme</strong>
      <Header.NavigationMenu label="Main">
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="#" active>
              Home
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="#">Products</NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="#">Pricing</NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </Header.NavigationMenu>
      <Button>Get started</Button>
    </Header>
  )
}
