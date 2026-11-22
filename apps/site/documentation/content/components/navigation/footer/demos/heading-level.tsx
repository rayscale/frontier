import { Footer } from '@rayscale/frontier'

export default function HeadingLevel() {
  return (
    <Footer>
      <Footer.Content>
        <Footer.Section>
          <Footer.Heading as="h3">Resources</Footer.Heading>
          <ul>
            <li>
              <a href="#">Documentation</a>
            </li>
            <li>
              <a href="#">Changelog</a>
            </li>
          </ul>
        </Footer.Section>
      </Footer.Content>
    </Footer>
  )
}
