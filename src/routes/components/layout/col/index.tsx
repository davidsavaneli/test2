import { createFileRoute } from '@tanstack/react-router'
import { Button, Col, PageLayout } from 'sava-test/components'

export const Route = createFileRoute('/components/layout/col/')({
  staticData: { name: 'Col', order: 2 },
  component: ColPage,
})

function ColPage() {
  return (
    <PageLayout>
      <Col gap="md" style={{ maxWidth: 280 }}>
        <Button fullWidth>First</Button>
        <Button fullWidth>Second</Button>
        <Button fullWidth>Third</Button>
      </Col>
    </PageLayout>
  )
}
