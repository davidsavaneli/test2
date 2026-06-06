import { createFileRoute } from '@tanstack/react-router'
import { Badge, Button, Icon, IconButton, PageLayout, Row } from 'sava-test/components'

export const Route = createFileRoute('/components/display/badge/')({
  staticData: { name: 'Badge', order: 4 },
  component: BadgePage,
})

function BadgePage() {
  return (
    <PageLayout>
      <Row gap="lg" align="center">
        <Badge content={2}>
          <IconButton aria-label="Notifications">
            <Icon name="Notification" />
          </IconButton>
        </Badge>
        <Badge content={150} max={99}>
          <IconButton aria-label="Messages">
            <Icon name="Sms" />
          </IconButton>
        </Badge>
        <Badge dot color="error">
          <IconButton aria-label="Profile">
            <Icon name="People" />
          </IconButton>
        </Badge>
        <Badge content={5} color="success">
          <Button>Inbox</Button>
        </Badge>
      </Row>
    </PageLayout>
  )
}
