import type { HTMLAttributes, ReactNode } from 'react'

/** Card networks that have their own logo. `generic` is a neutral card. */
export type TCreditCardBrand =
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'discover'
  | 'jcb'
  | 'unionpay'
  | 'diners'
  | 'maestro'
  | 'generic'

/** Surface treatment of the card. */
export type TCreditCardVariant = 'primary' | 'inverse' | 'subtle'

/** Width of the card. The proportions and the type scale with it. */
export type TCreditCardSize = 'small' | 'medium' | 'large'

/** Props for {@link CreditCard}, in addition to native `div` attributes. */
export type TCreditCardProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /**
   * Card number. Spaces are ignored and the digits are grouped for the
   * network. The component only displays it: it never stores or sends it.
   */
  number?: string | undefined
  /** Card network. `auto` reads it from the number. Defaults to `auto`. */
  brand?: TCreditCardBrand | 'auto' | undefined
  /** Name of the card holder. */
  holder?: string | undefined
  /** Expiry date as it is printed, for example `06/28`. */
  expiry?: string | undefined
  /** Name or mark of the issuer, shown at the top start of the card. */
  issuer?: ReactNode | undefined
  /** Surface treatment. Defaults to `primary`. */
  variant?: TCreditCardVariant | undefined
  /** Width of the card. Defaults to `medium`. */
  size?: TCreditCardSize | undefined
  /** Any CSS color. Tints the `primary` variant with a gradient of it. */
  accent?: string | undefined
  /** Hides every digit but the last four. Defaults to `true`. */
  masked?: boolean | undefined
  /** Draws the network logo in the text color instead of its own colors. */
  monochrome?: boolean | undefined
  /** Shows the contactless symbol. Defaults to `true`. */
  contactless?: boolean | undefined
  /** Replaces the network logo, for a network the component has no logo for. */
  logo?: ReactNode | undefined
}
