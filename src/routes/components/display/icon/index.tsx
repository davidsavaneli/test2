import { createFileRoute } from '@tanstack/react-router'
import { Icon } from 'sava-test/components'

export const Route = createFileRoute('/components/display/icon/')({
  staticData: { name: 'Icon', order: 1 },
  component: IconPage,
})

const SAMPLE = [
  'Home2',
  'Heart',
  'Setting2',
  'People',
  'SearchNormal',
  'Notification',
  'Star',
  'Send2',
] as const

function IconPage() {
  return (
    <div className="card demo-stack">
      <div className="demo-row">
        {SAMPLE.map((name) => (
          <Icon key={name} name={name} size="lg" />
        ))}
      </div>
      <div className="demo-row">
        <Icon name="Heart" size="sm" />
        <Icon name="Heart" size="md" />
        <Icon name="Heart" size="lg" />
      </div>
      <div className="demo-row">
        <Icon name="Heart" color="primary" size="lg" />
        <Icon name="Heart" color="success" size="lg" />
        <Icon name="Heart" color="error" size="lg" />
        <Icon name="Heart" color="warning" size="lg" />
      </div>
    </div>
  )
}
