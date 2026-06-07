import { createFileRoute } from '@tanstack/react-router'
import { PageLayout, Row, ThemeToggle, Typography } from 'sava-test/components'

export const Route = createFileRoute('/components/theme-toggle/')({
  staticData: { name: 'Theme Toggle', icon: 'Sun', order: 2 },
  component: ThemeTogglePage,
})

function ThemeTogglePage() {
  return (
    <PageLayout>
      <Row gap="md" wrap>
        <ThemeToggle />
        <ThemeToggle variant="filled" />
        <ThemeToggle variant="outlined" />
        <ThemeToggle variant="text" />
        <Typography variant="body" color="muted">
          Click any toggle — the whole panel switches theme.
        </Typography>
      </Row>
    </PageLayout>
  )
}
