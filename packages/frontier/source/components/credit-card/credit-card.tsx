import { type CSSProperties, forwardRef } from 'react'

import { classNames } from '../../internal/helpers/class-names.js'
import type { TCssCustomProperties } from '../../internal/helpers/css-custom-properties.js'

import { detectCreditCardBrand } from './helpers/detect-brand.js'
import { formatCardNumber, getLastDigits } from './helpers/format-number.js'
import { BrandLogo } from './parts/brand-logo.js'
import { ContactlessIcon } from './parts/contactless-icon.js'
import type { TCreditCardBrand, TCreditCardProps } from './types.js'

import './credit-card.css'

export { detectCreditCardBrand } from './helpers/detect-brand.js'
export type {
  TCreditCardBrand,
  TCreditCardProps,
  TCreditCardSize,
  TCreditCardVariant,
} from './types.js'

const brandNames = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'American Express',
  discover: 'Discover',
  jcb: 'JCB',
  unionpay: 'UnionPay',
  diners: 'Diners Club',
  maestro: 'Maestro',
  generic: 'Credit',
} as const satisfies { [TBrand in TCreditCardBrand]: string }

/**
 * Renders the face of a payment card: issuer, network logo, number, holder,
 * and expiry. It is a display only and never handles a full card number
 * beyond printing it, so it is masked unless `masked` is `false`.
 */
export const CreditCard = forwardRef<HTMLDivElement, TCreditCardProps>(function CreditCard(
  {
    accent,
    brand = 'auto',
    className,
    contactless = true,
    expiry,
    holder,
    issuer,
    logo,
    masked = true,
    monochrome = false,
    number = '',
    size = 'medium',
    style,
    variant = 'primary',
    ...props
  },
  ref,
) {
  const resolvedBrand = brand === 'auto' ? detectCreditCardBrand(number) : brand
  const lastDigits = getLastDigits(number)
  const label = lastDigits
    ? `${brandNames[resolvedBrand]} card ending in ${lastDigits}`
    : `${brandNames[resolvedBrand]} card`
  const accentStyle: (CSSProperties & TCssCustomProperties) | undefined =
    accent === undefined ? undefined : { '--_credit-card-accent': accent }
  const classes = classNames(
    'frontier-credit-card',
    `frontier-credit-card--${variant}`,
    `frontier-credit-card--${size}`,
    accent !== undefined && 'frontier-credit-card--accent',
    className,
  )

  return (
    <div
      role="group"
      aria-label={label}
      {...props}
      ref={ref}
      className={classes}
      style={{ ...accentStyle, ...style }}
    >
      <div className="frontier-credit-card__body">
        <div className="frontier-credit-card__top">
          <span className="frontier-credit-card__issuer">{issuer}</span>
          {contactless && <ContactlessIcon />}
        </div>
        <div className="frontier-credit-card__bottom">
          <div className="frontier-credit-card__details">
            {(holder ?? expiry) !== undefined && (
              <div className="frontier-credit-card__meta">
                <span className="frontier-credit-card__holder">{holder}</span>
                <span className="frontier-credit-card__expiry">{expiry}</span>
              </div>
            )}
            {number &&
              (masked ? (
                <span
                  className="frontier-credit-card__number"
                  role="img"
                  aria-label={`Card number ending in ${lastDigits}`}
                >
                  {formatCardNumber(number, resolvedBrand, true)}
                </span>
              ) : (
                <span className="frontier-credit-card__number">
                  {formatCardNumber(number, resolvedBrand, false)}
                </span>
              ))}
          </div>
          <span
            className="frontier-credit-card__brand"
            data-monochrome={monochrome ? '' : undefined}
          >
            {logo ?? <BrandLogo brand={resolvedBrand} monochrome={monochrome} />}
          </span>
        </div>
      </div>
    </div>
  )
})
