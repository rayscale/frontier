import { Footer } from '@rayscale/frontier'

export default function Transparent() {
  return (
    <Footer transparent>
      <Footer.Content>
        <Footer.Brand>
          <strong>Acme</strong>
        </Footer.Brand>
      </Footer.Content>
      <Footer.Bottom>All rights reserved.</Footer.Bottom>
    </Footer>
  )
}
