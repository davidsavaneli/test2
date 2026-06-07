import { createFileRoute } from '@tanstack/react-router'
import { Button, Dropdown, Icon, IconButton, ListItem, PageLayout, Row } from 'sava-test/components'

export const Route = createFileRoute('/components/display/dropdown/')({
  staticData: { name: 'Dropdown', order: 10 },
  component: DropdownPage,
})

function DropdownPage() {
  return (
    <PageLayout>
      <Row gap="md">
        <Dropdown trigger={<Button endIcon={<Icon name="ArrowDown2" />}>Menu</Button>}>
          <ListItem icon="Profile" clickable>
            Profile
          </ListItem>
          <ListItem icon="Setting2" clickable>
            Settings
          </ListItem>
          <ListItem icon="Logout" clickable>
            Sign out
          </ListItem>
        </Dropdown>
        <Dropdown
          placement="bottom-end"
          trigger={
            <IconButton aria-label="More actions">
              <Icon name="More" />
            </IconButton>
          }
        >
          <ListItem clickable>Edit</ListItem>
          <ListItem clickable>Duplicate</ListItem>
          <ListItem clickable>Delete</ListItem>
        </Dropdown>
      </Row>
    </PageLayout>
  )
}
