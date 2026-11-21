'use client'

import { Badge, Button, Input, Progress, Switch } from '@rayscale/frontier'
import type { TThemeMode } from '@rayscale/frontier/theme-metadata'
import type { ReactElement } from 'react'

import './theme-docs.css'

/** The region of a theme in one mode. It carries both attributes, so it ignores the page around it. */
interface TThemeRegionProps {
  theme: string
  title: string
  mode: TThemeMode
}

/** Components in a region of a theme, whatever theme and mode the page uses. */
export function ThemePreview({ theme, title, mode }: TThemeRegionProps): ReactElement {
  return (
    <div
      className="theme-preview"
      data-theme={theme}
      data-mode={mode}
      role="group"
      aria-label={`${title} theme in ${mode} mode`}
    >
      <div className="theme-preview__row">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>
      <Input label="Email" placeholder="you@example.com" description="We never share it." />
      <div className="theme-preview__row">
        <Switch label="Notifications" defaultChecked />
        <Badge variant="secondary">New</Badge>
      </div>
      <Progress value={60} aria-label={`${title} ${mode} progress`} />
    </div>
  )
}

/** A small, decorative sample of the colors of a theme in one mode. */
export function ThemeSample({ theme, mode }: Omit<TThemeRegionProps, 'title'>): ReactElement {
  return (
    <div className="theme-sample" data-theme={theme} data-mode={mode} aria-hidden="true">
      <div className="theme-sample__chips">
        <span className="theme-sample__chip theme-sample__chip--primary" />
        <span className="theme-sample__chip theme-sample__chip--secondary" />
        <span className="theme-sample__chip theme-sample__chip--sunken" />
      </div>
      <span className="theme-sample__line" />
      <span className="theme-sample__line theme-sample__line--muted" />
    </div>
  )
}
