import { createFileRoute } from '@tanstack/react-router'
import { FullscreenToggle, PageLayout, Row, Typography } from 'sava-test/components'

export const Route = createFileRoute('/components/display/fullscreen-toggle/')({
  staticData: { name: 'Fullscreen Toggle', order: 11 },
  component: FullscreenTogglePage,
})

function FullscreenTogglePage() {
  return (
    <PageLayout>
      <Row gap="md" align="center">
        <FullscreenToggle />
        <FullscreenToggle variant="filled" />
        <FullscreenToggle variant="outlined" />
        <Typography color="muted">Toggles the browser Fullscreen API.</Typography>
      </Row>
    </PageLayout>
  )
}
