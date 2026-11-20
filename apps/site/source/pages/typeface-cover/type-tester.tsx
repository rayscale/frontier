'use client'

import { Input, SegmentedControl, Slider, type TSliderValue } from '@rayscale/frontier'
import { type CSSProperties, type ReactElement, useState } from 'react'

type TFamily = 'sans' | 'mono'

const families: { [family in TFamily]: string } = {
  sans: 'var(--frontier-font-family)',
  mono: 'var(--frontier-font-family-mono)',
}

function toNumber(value: TSliderValue): number {
  return typeof value === 'number' ? value : (value[0] ?? 0)
}

/** Edit a sample and see it in the family, weight, and size you pick. */
export function TypeTester(): ReactElement {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog.')
  const [family, setFamily] = useState<TFamily>('sans')
  const [weight, setWeight] = useState(400)
  const [size, setSize] = useState(56)

  const style: CSSProperties = {
    fontFamily: families[family],
    fontSize: `${String(size)}px`,
    fontWeight: weight,
  }

  return (
    <div className="type-tester">
      <div className="type-tester__controls">
        <SegmentedControl<TFamily>
          label="Family"
          value={family}
          onChange={setFamily}
          options={[
            { label: 'Geist', value: 'sans' },
            { label: 'Geist Mono', value: 'mono' },
          ]}
        />
        <Slider
          label="Weight"
          min={300}
          max={700}
          step={100}
          value={weight}
          onValueChange={(value) => {
            setWeight(toNumber(value))
          }}
        />
        <Slider
          label="Size"
          min={16}
          max={96}
          step={2}
          value={size}
          onValueChange={(value) => {
            setSize(toNumber(value))
          }}
        />
      </div>
      <p className="type-tester__sample" style={style}>
        {text}
      </p>
      <Input
        label="Sample text"
        value={text}
        onChange={(event) => {
          setText(event.target.value)
        }}
      />
    </div>
  )
}
