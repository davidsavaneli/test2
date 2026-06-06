import { createFileRoute } from '@tanstack/react-router'
import { Checkbox, Col, PageLayout } from 'sava-test/components'

export const Route = createFileRoute('/components/forms/checkbox/')({
  staticData: { name: 'Checkbox', order: 4 },
  component: CheckboxPage,
})

function CheckboxPage() {
  return (
    <PageLayout>
      <Col gap="lg">
        <Checkbox label="Default" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Success Color" color="success" defaultChecked />
        <Checkbox label="Error State" error />
        <Checkbox label="Required" required />
        <Checkbox label="Disabled" disabled />
      </Col>
    </PageLayout>
  )
}
