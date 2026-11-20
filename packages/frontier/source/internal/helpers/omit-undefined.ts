type TOptionalKeys<TProps extends object> = {
  [TKey in keyof TProps]-?: undefined extends TProps[TKey] ? TKey : never
}[keyof TProps]

type TDefined<TProps extends object> = {
  [TKey in TOptionalKeys<TProps>]?: Exclude<TProps[TKey], undefined>
} & {
  [TKey in Exclude<keyof TProps, TOptionalKeys<TProps>>]: TProps[TKey]
}

/** Drops properties whose value is `undefined`, so they can be spread into an exact optional prop type. */
export function omitUndefined<TProps extends object>(props: TProps): TDefined<TProps> {
  return Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined),
  ) as TDefined<TProps>
}
