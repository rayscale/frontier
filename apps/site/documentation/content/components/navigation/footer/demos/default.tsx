import { Footer } from '@rayscale/frontier'

export default function Default() {
  return (
    <Footer>
      <Footer.Content>
        <Footer.Brand>
          <strong>Acme</strong>
          <p>Tools for small teams.</p>
        </Footer.Brand>
        <Footer.Section>
          <Footer.Heading>Product</Footer.Heading>
          <ul>
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
          </ul>
        </Footer.Section>
        <Footer.Section>
          <Footer.Heading>Company</Footer.Heading>
          <ul>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </Footer.Section>
      </Footer.Content>
      <Footer.Bottom>Acme is licensed under the MIT License.</Footer.Bottom>
    </Footer>
  )
}
