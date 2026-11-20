/** Inline style entries for CSS custom properties, which React's CSSProperties type omits. */
export interface TCssCustomProperties {
  [property: `--${string}`]: string
}
