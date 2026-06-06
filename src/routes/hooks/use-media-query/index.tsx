import { createFileRoute } from '@tanstack/react-router'
import { Col, PageLayout, Typography } from 'sava-test/components'
import { useMediaQuery } from '../../../hooks/useMediaQuery'

export const Route = createFileRoute('/hooks/use-media-query/')({
  staticData: { name: 'useMediaQuery' },
  component: UseMediaQueryPage,
})

function UseMediaQueryPage() {
  const isWide = useMediaQuery('(min-width: 1024px)')
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

  return (
    <PageLayout>
      <Col gap="lg">
        <Typography variant="body">
          <strong>(min-width: 1024px)</strong> → {isWide ? 'matches ✓' : 'no match — narrow'}
        </Typography>
        <Typography variant="body">
          <strong>(prefers-color-scheme: dark)</strong> → {prefersDark ? 'matches ✓' : 'no match'}
        </Typography>
        <Typography variant="bodySmall" color="tertiary">
          Resize the window past 1024px to watch the first row flip live.
        </Typography>
      </Col>
    </PageLayout>
  )
}
