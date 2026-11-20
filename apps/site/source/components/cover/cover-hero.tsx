import type { ReactElement, ReactNode } from 'react'

import './cover.css'

interface TCoverHeroProps {
  /** Short label above the title, such as the section name. */
  eyebrow: string
  title: string
  description: string
  /** Buttons that lead on from the hero. */
  children?: ReactNode | undefined
}

/** The opening of a cover page: label, title, one sentence, and actions. */
export function CoverHero({
  eyebrow,
  title,
  description,
  children,
}: TCoverHeroProps): ReactElement {
  return (
    <section className="cover-hero" aria-labelledby="cover-title">
      <p className="cover-hero__eyebrow">{eyebrow}</p>
      <h1 id="cover-title">{title}</h1>
      <p className="cover-hero__description">{description}</p>
      {children ? <div className="cover-hero__actions">{children}</div> : null}
    </section>
  )
}
