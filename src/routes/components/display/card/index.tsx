import { createFileRoute } from '@tanstack/react-router'
import { Button, Card, Col, PageLayout, Typography } from 'sava-test/components'

export const Route = createFileRoute('/components/display/card/')({
  staticData: { name: 'Card', order: 8 },
  component: CardPage,
})

function CardPage() {
  return (
    <PageLayout>
      <Col gap="lg">
        <Card icon="Setting2" title="Settings" subtitle="Manage your preferences" color="primary">
          <Typography>Card body content goes here.</Typography>
        </Card>
        <Card
          icon="People"
          title="Team"
          color="success"
          collapsible
          footerStart={
            <Button size="sm" variant="text">
              Cancel
            </Button>
          }
          footer={<Button size="sm">Save</Button>}
        >
          <Typography>A collapsible card with footer actions.</Typography>
        </Card>
        <Card title="Plain Card">
          <Typography>No icon, no footer.</Typography>
        </Card>
      </Col>
    </PageLayout>
  )
}
