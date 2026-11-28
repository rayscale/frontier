import { CreditCard, type TCreditCardBrand } from '@rayscale/frontier'

const brands: readonly TCreditCardBrand[] = [
  'visa',
  'mastercard',
  'amex',
  'discover',
  'jcb',
  'unionpay',
  'diners',
  'maestro',
  'generic',
]

export default function Networks() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {brands.map((brand) => (
        <CreditCard key={brand} brand={brand} size="small" contactless={false} />
      ))}
    </div>
  )
}
