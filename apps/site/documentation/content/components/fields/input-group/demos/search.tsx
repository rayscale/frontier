import { Button, InputGroup, Search } from '@rayscale/frontier'

export default function SearchField() {
  return (
    <InputGroup label="Search">
      <InputGroup.Addon>
        <Search aria-hidden="true" />
      </InputGroup.Addon>
      <InputGroup.Input type="search" placeholder="Search the documentation" />
      <InputGroup.Addon align="end">
        <Button variant="secondary" size="small">
          Search
        </Button>
      </InputGroup.Addon>
    </InputGroup>
  )
}
