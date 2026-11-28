import { type ReactElement, type SVGProps, useId } from 'react'

import { amexArtwork } from '../brands/amex.js'
import type { TBrandArtwork } from '../brands/artwork.js'
import { dinersArtwork } from '../brands/diners.js'
import { discoverArtwork } from '../brands/discover.js'
import { jcbArtwork } from '../brands/jcb.js'
import { maestroArtwork } from '../brands/maestro.js'
import { mastercardArtwork } from '../brands/mastercard.js'
import { unionpayArtwork } from '../brands/unionpay.js'
import { visaArtwork } from '../brands/visa.js'
import type { TCreditCardBrand } from '../types.js'

interface TBrandLogoProps {
  brand: TCreditCardBrand
  monochrome: boolean
}

const artwork = {
  visa: visaArtwork,
  mastercard: mastercardArtwork,
  amex: amexArtwork,
  discover: discoverArtwork,
  jcb: jcbArtwork,
  unionpay: unionpayArtwork,
  diners: dinersArtwork,
  maestro: maestroArtwork,
} as const satisfies { [TBrand in Exclude<TCreditCardBrand, 'generic'>]: TBrandArtwork }

function Svg({ children, ...props }: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg className="frontier-credit-card__logo" aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  )
}

export function BrandLogo({ brand, monochrome }: TBrandLogoProps): ReactElement {
  const id = useId().replaceAll(':', '')

  if (brand === 'generic') {
    return (
      <Svg viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="1" width="30" height="22" rx="4" />
        <path d="M1 8h30" />
      </Svg>
    )
  }

  const { color, colorViewBox, mono } = artwork[brand]

  return monochrome ? (
    <Svg viewBox="0 0 780 500">{mono()}</Svg>
  ) : (
    <Svg viewBox={colorViewBox}>{color(id)}</Svg>
  )
}
