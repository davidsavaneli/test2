import { createFileRoute } from '@tanstack/react-router'
import { Icon, List, ListItem, PageLayout } from 'sava-test/components'

export const Route = createFileRoute('/components/display/list/')({
  staticData: { name: 'List', order: 9 },
  component: ListPage,
})

function ListPage() {
  return (
    <PageLayout>
      <List>
        <ListItem icon="Home2" description="Overview" clickable>
          Dashboard
        </ListItem>
        <ListItem icon="People" clickable selected>
          Users
        </ListItem>
        <ListItem icon="Setting2" clickable trailing={<Icon name="ArrowRight2" />}>
          Settings
        </ListItem>
        <ListItem icon="Logout" disabled>
          Disabled
        </ListItem>
      </List>
    </PageLayout>
  )
}
