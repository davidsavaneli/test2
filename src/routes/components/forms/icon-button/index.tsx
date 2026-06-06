import { createFileRoute } from '@tanstack/react-router'
import { Col, Icon, IconButton, PageLayout, Row } from 'sava-test/components'

export const Route = createFileRoute('/components/forms/icon-button/')({
  staticData: { name: 'Icon Button', order: 1 },
  component: IconButtonPage,
})

function IconButtonPage() {
  return (
    <PageLayout>
      <Col gap="lg">
        <Row gap="md" wrap>
          <IconButton aria-label="Add" variant="contained">
            <Icon name="Add" />
          </IconButton>
          <IconButton aria-label="Edit" variant="filled">
            <Icon name="Edit2" />
          </IconButton>
          <IconButton aria-label="Delete" variant="outlined" color="error">
            <Icon name="Trash" />
          </IconButton>
          <IconButton aria-label="Like" variant="text">
            <Icon name="Heart" />
          </IconButton>
        </Row>
        <Row gap="md" wrap>
          <IconButton aria-label="Settings small" size="sm">
            <Icon name="Setting2" />
          </IconButton>
          <IconButton aria-label="Settings medium" size="md">
            <Icon name="Setting2" />
          </IconButton>
          <IconButton aria-label="Settings large" size="lg">
            <Icon name="Setting2" />
          </IconButton>
          <IconButton aria-label="Loading" loading>
            <Icon name="Setting2" />
          </IconButton>
          <IconButton aria-label="Rounded" rounded>
            <Icon name="Setting2" />
          </IconButton>
        </Row>
      </Col>
    </PageLayout>
  )
}
