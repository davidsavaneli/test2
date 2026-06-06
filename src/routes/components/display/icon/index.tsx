import { createFileRoute } from '@tanstack/react-router'
import { Col, Icon, PageLayout, Row } from 'sava-test/components'

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
    <PageLayout>
      <Col gap="lg">
        <Row gap="md" wrap>
          {SAMPLE.map((name) => (
            <Icon key={name} name={name} size="lg" />
          ))}
        </Row>
        <Row gap="md" wrap>
          <Icon name="Heart" size="sm" />
          <Icon name="Heart" size="md" />
          <Icon name="Heart" size="lg" />
        </Row>
        <Row gap="md" wrap>
          <Icon name="Heart" color="primary" size="lg" />
          <Icon name="Heart" color="success" size="lg" />
          <Icon name="Heart" color="error" size="lg" />
          <Icon name="Heart" color="warning" size="lg" />
        </Row>
      </Col>
    </PageLayout>
  )
}
