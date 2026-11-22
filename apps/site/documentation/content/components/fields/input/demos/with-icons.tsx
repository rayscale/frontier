import { AtSign, Input, Search } from '@rayscale/frontier'

export default function WithIcons() {
  return (
    <>
      <Input
        label="Search"
        type="search"
        placeholder="Search the documentation"
        leadingIcon={<Search />}
      />
      <Input label="Handle" placeholder="ana" leadingIcon={<AtSign />} />
    </>
  )
}
