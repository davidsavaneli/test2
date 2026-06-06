import { createFileRoute } from '@tanstack/react-router'
import { Chip, Col, Flex, PageLayout, Typography } from 'sava-test/components'

export const Route = createFileRoute('/components/layout/flex/')({
  staticData: { name: 'Flex', order: 0 },
  component: FlexPage,
})

const ITEMS = ['One', 'Two', 'Three', 'Four', 'Five']

function FlexPage() {
  return (
    <PageLayout>
      <Col gap="lg">
        <Typography variant="bodySmall" color="tertiary">
          direction="row" (default) · gap · wrap
        </Typography>
        <Flex gap="sm" wrap>
          {ITEMS.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </Flex>
        <Typography variant="bodySmall" color="tertiary">
          justify="between"
        </Typography>
        <Flex gap="sm" justify="between">
          <Chip>Start</Chip>
          <Chip>End</Chip>
        </Flex>
        <Typography variant="bodySmall" color="tertiary">
          direction="column"
        </Typography>
        <Flex direction="column" gap="sm">
          <Chip>One</Chip>
          <Chip>Two</Chip>
          <Chip>Three</Chip>
        </Flex>
      </Col>
    </PageLayout>
  )
}
