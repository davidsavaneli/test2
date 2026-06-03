import { createFileRoute } from '@tanstack/react-router'

// Group chrome lives with the group — no central config. No component → renders an <Outlet />.
export const Route = createFileRoute('/components/display')({
  staticData: { name: 'Display', icon: 'Gallery', order: 1 },
})
