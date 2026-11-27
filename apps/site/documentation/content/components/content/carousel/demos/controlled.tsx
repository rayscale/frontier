import { Button, Carousel } from '@rayscale/frontier'
import { useState } from 'react'

const slides = ['One', 'Two', 'Three', 'Four', 'Five']

const slide = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '10rem',
  border: 'var(--frontier-border-width) solid var(--frontier-color-border)',
  borderRadius: 'var(--frontier-radius-lg)',
  fontSize: 'var(--frontier-font-size-3xl)',
  fontWeight: 'var(--frontier-font-weight-semibold)',
}

export default function Controlled() {
  const [index, setIndex] = useState(0)

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Carousel.Root aria-label="Photos" index={index} onIndexChange={setIndex}>
        <Carousel.Content>
          {slides.map((name, position) => (
            <Carousel.Item
              key={name}
              aria-label={`${String(position + 1)} of ${String(slides.length)}`}
            >
              <div style={slide}>{name}</div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.Dots />
      </Carousel.Root>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>
          Slide {index + 1} of {slides.length}
        </span>
        <Button
          variant="outline"
          onClick={() => {
            setIndex(0)
          }}
        >
          Back to the first
        </Button>
      </div>
    </div>
  )
}
