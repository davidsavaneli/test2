import { createFileRoute } from '@tanstack/react-router'
import { NumberField } from 'sava-test/components'

export const Route = createFileRoute('/components/forms/number-field/')({
  staticData: { name: 'Number Field', order: 3 },
  component: NumberFieldPage,
})

function NumberFieldPage() {
  return (
    <div className="card demo-col">
      <NumberField label="Basic (0–10)" defaultValue={1} min={0} max={10} />
      <NumberField label="Step 5" defaultValue={0} step={5} />
      <NumberField label="Thousand Separator" defaultValue={32345} thousandSeparator="," />
      <NumberField label="No Stepper" defaultValue={42} hideStepper />
      <NumberField label="Disabled" defaultValue={3} disabled />
    </div>
  )
}
