import { Combobox } from '@rayscale/frontier'

const groups = [
  {
    label: 'Frontend',
    items: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
    ],
  },
  {
    label: 'Backend',
    items: [
      { value: 'node', label: 'Node.js' },
      { value: 'go', label: 'Go' },
      { value: 'rust', label: 'Rust' },
    ],
  },
]

export default function Groups() {
  return (
    <Combobox items={groups}>
      <Combobox.Input label="Framework" placeholder="Search frameworks" />
      <Combobox.Content>
        <Combobox.List />
        <Combobox.Empty>No framework found.</Combobox.Empty>
      </Combobox.Content>
    </Combobox>
  )
}
