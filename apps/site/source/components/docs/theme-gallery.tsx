'use client'

import { Badge, Button, Card } from '@rayscale/frontier'
import { themeMetadata } from '@rayscale/frontier/theme-metadata'
import type { ReactElement } from 'react'

import { ThemePicker, useTheme } from '#/components/theme/index.js'

import { ThemeSample } from './theme-preview.js'

import './theme-docs.css'

/** The themes of the package as cards, with a way to choose the theme of the site. */
export default function ThemeGallery(): ReactElement {
  const { theme: active, setTheme } = useTheme()

  return (
    <div className="theme-gallery">
      <ThemePicker />
      <ul className="theme-gallery__grid">
        {themeMetadata.map((theme) => (
          <li key={theme.name}>
            <Card as="article">
              <Card.Header>
                <Card.Title as="h3">
                  <a href={`/docs/themes/${theme.name}`}>{theme.title}</a>
                </Card.Title>
                <Card.Description>{theme.description}</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="theme-gallery__samples">
                  <ThemeSample theme={theme.name} mode="light" />
                  <ThemeSample theme={theme.name} mode="dark" />
                </div>
              </Card.Content>
              <Card.Footer>
                <div className="theme-gallery__footer">
                  <Badge variant={theme.kind === 'extended' ? 'outline' : 'secondary'}>
                    {theme.kind === 'extended' ? 'Extended' : 'Conformant'}
                  </Badge>
                  {active === theme.name ? (
                    <Badge>In use</Badge>
                  ) : (
                    <Button
                      size="small"
                      variant="outline"
                      onClick={() => {
                        setTheme(theme.name)
                      }}
                    >
                      Use {theme.title}
                    </Button>
                  )}
                </div>
              </Card.Footer>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
