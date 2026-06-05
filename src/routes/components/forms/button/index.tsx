import { createFileRoute } from '@tanstack/react-router'
import { Button, Icon } from 'sava-test/components'

export const Route = createFileRoute('/components/forms/button/')({
  staticData: { name: 'Button', order: 0 },
  component: ButtonPage,
})

function ButtonPage() {
  return (
    <div className="card demo-stack">
      <div className="demo-row">
        <Button variant="contained">Contained</Button>
        <Button variant="filled">Filled</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </div>
      <div className="demo-row">
        <Button color="primary">Primary</Button>
        <Button color="success">Success</Button>
        <Button color="error">Error</Button>
        <Button color="warning">Warning</Button>
      </div>
      <div className="demo-row">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="demo-row">
        <Button startIcon={<Icon name="Add" />}>Start Icon</Button>
        <Button endIcon={<Icon name="ArrowRight" />}>End Icon</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button rounded>Rounded</Button>
      </div>
    </div>
  )
}
