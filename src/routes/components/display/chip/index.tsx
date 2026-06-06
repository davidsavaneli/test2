import { createFileRoute } from '@tanstack/react-router'
import { Avatar, Chip, Col, Icon, PageLayout, Row } from 'sava-test/components'

export const Route = createFileRoute('/components/display/chip/')({
  staticData: { name: 'Chip', order: 5 },
  component: ChipPage,
})

function ChipPage() {
  return (
    <PageLayout>
      <Col gap="lg">
        <Row gap="sm" wrap>
          <Chip variant="contained">Contained</Chip>
          <Chip variant="filled">Filled</Chip>
          <Chip variant="outlined">Outlined</Chip>
          <Chip variant="text">Text</Chip>
        </Row>
        <Row gap="sm" wrap>
          <Chip color="primary">Primary</Chip>
          <Chip color="success">Success</Chip>
          <Chip color="error">Error</Chip>
          <Chip color="warning">Warning</Chip>
        </Row>
        <Row gap="sm" wrap>
          <Chip size="sm">Small</Chip>
          <Chip size="md">Medium</Chip>
          <Chip size="lg">Large</Chip>
        </Row>
        <Row gap="sm" wrap>
          <Chip startIcon={<Icon name="Star" />}>Icon</Chip>
          <Chip avatar={<Avatar name="David Savaneli" />}>David</Chip>
          <Chip onDelete={() => undefined}>Deletable</Chip>
          <Chip clickable>Clickable</Chip>
        </Row>
      </Col>
    </PageLayout>
  )
}
