import { createFileRoute } from '@tanstack/react-router'
import { Chip, Col, Grid, PageLayout, Typography } from 'sava-test/components'

export const Route = createFileRoute('/components/layout/grid/')({
  staticData: { name: 'Grid', order: 3 },
  component: GridPage,
})

const ITEMS = ['1', '2', '3', '4', '5', '6']

function GridPage() {
  return (
    <PageLayout>
      <Col gap="lg">
        <Typography variant="bodySmall" color="muted">
          cols={'{3}'} — fixed columns
        </Typography>
        <Grid cols={3} gap="md">
          {ITEMS.map((t) => (
            <Chip key={t}>Item {t}</Chip>
          ))}
        </Grid>
        <Typography variant="bodySmall" color="muted">
          minItemWidth={'{160}'} — responsive auto-fit
        </Typography>
        <Grid minItemWidth={160} gap="md">
          {ITEMS.map((t) => (
            <Chip key={t}>Item {t}</Chip>
          ))}
        </Grid>
      </Col>
    </PageLayout>
  )
}
