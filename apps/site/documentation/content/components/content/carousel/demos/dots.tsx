import { Carousel } from '@rayscale/frontier'

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

export default function Dots() {
  return (
    <Carousel.Root aria-label="Photos">
      <Carousel.Content>
        {slides.map((name, index) => (
          <Carousel.Item key={name} aria-label={`${String(index + 1)} of ${String(slides.length)}`}>
            <div style={slide}>{name}</div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
      <Carousel.Dots />
    </Carousel.Root>
  )
}
