import { createFileRoute } from '@tanstack/react-router'
import { FirstRouteRedirect } from 'sava-test/components'

// `/` has no page of its own — forward to the first menu item (logic lives in sava-test).
export const Route = createFileRoute('/')({
  component: FirstRouteRedirect,
})
