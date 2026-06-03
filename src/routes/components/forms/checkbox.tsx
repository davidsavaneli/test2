import { createFileRoute } from '@tanstack/react-router'
import { Checkbox } from 'sava-test'
import { Page } from '../../../components/Page'

export const Route = createFileRoute('/components/forms/checkbox')({
  staticData: { title: 'Checkbox', order: 4 },
  component: CheckboxPage,
})

function CheckboxPage() {
  return (
    <Page title="Checkbox" description="Boolean input with label, colors and states.">
      <div className="card demo-stack">
        <Checkbox label="Default" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Success Color" color="success" defaultChecked />
        <Checkbox label="Error State" error helperText="You must accept" />
        <Checkbox label="Disabled" disabled />
      </div>
    </Page>
  )
}
