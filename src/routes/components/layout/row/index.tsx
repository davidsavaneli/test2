import { createFileRoute } from '@tanstack/react-router'
import { Button, Col, PageLayout, Row, Typography } from 'sava-test/components'

export const Route = createFileRoute('/components/layout/row/')({
  staticData: { name: 'Row', order: 1 },
  component: RowPage,
})

function RowPage() {
  return (
    <PageLayout>
      <Col gap="lg">
        <Typography variant="bodySmall" color="muted">
          Horizontal, items centered · gap
        </Typography>
        <Row gap="md">
          <Button>A</Button>
          <Button>B</Button>
          <Button>C</Button>
        </Row>
        <Typography variant="bodySmall" color="muted">
          justify="between"
        </Typography>
        <Row gap="md" justify="between">
          <Button>Left</Button>
          <Button>Right</Button>
        </Row>
      </Col>
    </PageLayout>
  )
}
