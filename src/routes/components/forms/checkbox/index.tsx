import { createFileRoute } from '@tanstack/react-router'
import { Checkbox } from 'sava-test/components'

export const Route = createFileRoute('/components/forms/checkbox/')({
  staticData: { name: 'Checkbox', order: 4 },
  component: CheckboxPage,
})

function CheckboxPage() {
  return (
    <div className="card demo-stack">
      <Checkbox label="Default" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Success Color" color="success" defaultChecked />
      <Checkbox label="Error State" error helperText="You must accept" />
      <Checkbox label="Disabled" disabled />
    </div>
  )
}
