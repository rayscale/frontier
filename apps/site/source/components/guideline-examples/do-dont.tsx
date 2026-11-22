'use client'

import { Check, X } from '@rayscale/frontier'
import { type ReactElement, Suspense } from 'react'

import { examples, interactiveExamples } from './registry.js'
import type { TExampleSide } from './types.js'

import './do-dont.css'

const sides: { [side in TExampleSide]: { label: string } } = {
  do: { label: 'Do' },
  dont: { label: "Don't" },
}

function Card({
  caption,
  id,
  side,
}: {
  caption: string
  id: string
  side: TExampleSide
}): ReactElement {
  const Example = examples.get(id)
  const Icon = side === 'do' ? Check : X
  const interactive = interactiveExamples.has(id)

  return (
    <div className={`do-dont__card do-dont__card--${side}`}>
      <p className="do-dont__label">
        <Icon aria-hidden="true" size={16} />
        {sides[side].label}
      </p>
      {Example ? (
        <div
          aria-hidden={interactive ? undefined : true}
          className="do-dont__preview"
          inert={!interactive}
        >
          <Suspense fallback={null}>
            <Example side={side} />
          </Suspense>
        </div>
      ) : null}
      <p className="do-dont__caption">{caption}</p>
    </div>
  )
}

function parseCaptions(captions: string): string[][] {
  const value: unknown = JSON.parse(captions)

  return Array.isArray(value)
    ? value.map((row) => (Array.isArray(row) ? row.map((cell) => String(cell)) : []))
    : []
}

/**
 * Pairs of examples for a guideline. Each pair shows the Do and the Don't of one rule, drawn with
 * the real components, and captions each side with the words of the guideline. The examples are
 * illustrations: they are hidden from assistive technology and cannot take the focus.
 */
export function DoDont({
  captions,
  examples: ids,
}: {
  captions: string
  examples: string
}): ReactElement {
  const rows = parseCaptions(captions)

  return (
    <div className="do-dont">
      {ids.split(',').map((id, index) => (
        <div className="do-dont__pair" key={id} role="group">
          <Card caption={rows[index]?.[0] ?? ''} id={id} side="do" />
          <Card caption={rows[index]?.[1] ?? ''} id={id} side="dont" />
        </div>
      ))}
    </div>
  )
}
