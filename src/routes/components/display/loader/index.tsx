import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'sava-test'
import { Page } from '../../../../components/Page'

export const Route = createFileRoute('/components/display/loader/')({
  staticData: { title: 'Loader', order: 2 },
  component: LoaderPage,
})

function LoaderPage() {
  return (
    <Page title="Loader" description="Circular spinner — sizes and brand colors.">
      <div className="card demo-stack">
        <div className="demo-row">
          <Loader size="sm" />
          <Loader size="md" />
          <Loader size="lg" />
        </div>
        <div className="demo-row">
          <Loader color="primary" size="lg" />
          <Loader color="success" size="lg" />
          <Loader color="error" size="lg" />
          <Loader color="warning" size="lg" />
        </div>
      </div>
    </Page>
  )
}
