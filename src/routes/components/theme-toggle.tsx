import { createFileRoute } from '@tanstack/react-router'
import { ThemeToggle, Typography } from 'sava-test'
import { Page } from '../../components/Page'

export const Route = createFileRoute('/components/theme-toggle')({
  staticData: { name: 'Theme Toggle', icon: 'Sun', order: 2 },
  component: ThemeTogglePage,
})

function ThemeTogglePage() {
  return (
    <Page title="Theme Toggle" description="One-tap switch between light and dark mode.">
      <div className="card demo-row">
        <ThemeToggle />
        <ThemeToggle variant="filled" />
        <ThemeToggle variant="outlined" />
        <ThemeToggle variant="text" />
        <Typography variant="body" color="tertiary">
          Click any toggle — the whole panel switches theme.
        </Typography>
      </div>
    </Page>
  )
}
