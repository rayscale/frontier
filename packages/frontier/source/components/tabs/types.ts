import type { ButtonHTMLAttributes, HTMLAttributes } from 'react'

/** Orientation of the tab list. */
export type TTabsOrientation = 'horizontal' | 'vertical'

/** Props for {@link Tabs}, in addition to native `div` attributes. */
export type TTabsProps = Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> & {
  /** Selected tab value in controlled mode. Pass `null` to select no tab. */
  value?: string | null | undefined
  /** Initial selected tab value in uncontrolled mode. */
  defaultValue?: string | null | undefined
  /** Called when the selected tab changes. */
  onValueChange?: ((value: string | null) => void) | undefined
  /** Tab list orientation. Defaults to `horizontal`. */
  orientation?: TTabsOrientation | undefined
}

/** Props for `Tabs.List`. */
export type TTabsListProps = HTMLAttributes<HTMLDivElement>

/** Props for `Tabs.Trigger`, in addition to native button attributes. */
export type TTabsTriggerProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> & {
  /** TValue associated with the corresponding `Tabs.Content`. */
  value: string
}

/** Props for `Tabs.Content`, in addition to native `div` attributes. */
export type TTabsContentProps = HTMLAttributes<HTMLDivElement> & {
  /** TValue associated with the corresponding `Tabs.Trigger`. */
  value: string
}
