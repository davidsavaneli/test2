import { createFileRoute } from '@tanstack/react-router'
import { Col, Loader, PageLayout, Row } from 'sava-test/components'

export const Route = createFileRoute('/components/display/loader/')({
  staticData: { name: 'Loader', order: 2 },
  component: LoaderPage,
})

function LoaderPage() {
  return (
    <PageLayout>
      <Col gap="lg">
        <Row gap="md" wrap>
          <Loader size="sm" />
          <Loader size="md" />
          <Loader size="lg" />
        </Row>
        <Row gap="md" wrap>
          <Loader color="primary" size="lg" />
          <Loader color="success" size="lg" />
          <Loader color="error" size="lg" />
          <Loader color="warning" size="lg" />
        </Row>
      </Col>
    </PageLayout>
  )
}
