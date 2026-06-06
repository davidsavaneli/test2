import { createFileRoute } from '@tanstack/react-router'
import { Col, Divider, PageLayout, Row, Typography } from 'sava-test/components'

export const Route = createFileRoute('/components/display/divider/')({
  staticData: { name: 'Divider', order: 6 },
  component: DividerPage,
})

function DividerPage() {
  return (
    <PageLayout>
      <Col gap="md">
        <Typography>Section one</Typography>
        <Divider />
        <Typography>Section two</Typography>
        <Divider align="left">Left</Divider>
        <Divider>Center</Divider>
        <Divider align="right">Right</Divider>
        <Row gap="md" align="center" style={{ height: 32 }}>
          <Typography>Left</Typography>
          <Divider orientation="vertical" />
          <Typography>Right</Typography>
        </Row>
      </Col>
    </PageLayout>
  )
}
