import { createFileRoute } from '@tanstack/react-router'
import { Avatar, AvatarGroup, Col, PageLayout, Row, Typography } from 'sava-test/components'

export const Route = createFileRoute('/components/display/avatar/')({
  staticData: { name: 'Avatar', order: 3 },
  component: AvatarPage,
})

function AvatarPage() {
  return (
    <PageLayout>
      <Col gap="lg">
        <Row gap="md" align="center">
          <Avatar name="David Savaneli" />
          <Avatar name="Anna Bell" color="success" />
          <Avatar icon="People" color="info" />
          <Avatar shape="square" name="Box Co" color="warning" />
        </Row>
        <Row gap="md" align="center">
          <Avatar name="DS" size="sm" />
          <Avatar name="DS" size="md" />
          <Avatar name="DS" size="lg" />
        </Row>
        <Typography variant="bodySmall" color="muted">
          AvatarGroup (max 3)
        </Typography>
        <AvatarGroup max={3}>
          <Avatar name="A B" />
          <Avatar name="C D" />
          <Avatar name="E F" />
          <Avatar name="G H" />
        </AvatarGroup>
      </Col>
    </PageLayout>
  )
}
