import { AtSign, Input, Search } from '@rayscale/frontier'

export default function WithSymbols() {
  return (
    <>
      <Input
        label="Search"
        type="search"
        placeholder="Search the docs"
        leadingSymbol={<Search />}
      />
      <Input label="Handle" placeholder="ana" leadingSymbol={<AtSign />} />
    </>
  )
}
