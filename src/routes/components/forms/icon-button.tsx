import { createFileRoute } from '@tanstack/react-router'
import { Icon, IconButton } from 'sava-test'
import { Page } from '../../../components/Page'

export const Route = createFileRoute('/components/forms/icon-button')({
  staticData: { name: 'Icon Button', order: 1 },
  component: IconButtonPage,
})

function IconButtonPage() {
  return (
    <Page title="Icon Button" description="Square, text-less button for a single icon.">
      <div className="card demo-stack">
        <div className="demo-row">
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
        </div>
        <div className="demo-row">
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
        </div>
      </div>
    </Page>
  )
}
