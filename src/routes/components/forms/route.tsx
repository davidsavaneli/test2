import { createFileRoute } from '@tanstack/react-router'

// Group chrome lives with the group — no central config. No component → renders an <Outlet />.
export const Route = createFileRoute('/components/forms')({
  staticData: { name: 'Forms', icon: 'DocumentText', order: 0 },
})
