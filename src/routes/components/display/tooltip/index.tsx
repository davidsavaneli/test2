import { createFileRoute } from '@tanstack/react-router'
import { Button, Icon, IconButton, PageLayout, Row, Tooltip } from 'sava-test/components'

export const Route = createFileRoute('/components/display/tooltip/')({
  staticData: { name: 'Tooltip', order: 7 },
  component: TooltipPage,
})

function TooltipPage() {
  return (
    <PageLayout>
      <Row gap="md" wrap align="center">
        <Tooltip content="Top (default)">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip content="Bottom" placement="bottom">
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip content="Left" placement="left">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip content="Right" placement="right">
          <Button>Right</Button>
        </Tooltip>
        <Tooltip content="Settings">
          <IconButton aria-label="Settings">
            <Icon name="Setting2" />
          </IconButton>
        </Tooltip>
      </Row>
    </PageLayout>
  )
}
