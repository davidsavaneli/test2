import { createFileRoute } from '@tanstack/react-router'

// Group chrome for the layout primitives. No component → renders an <Outlet />.
export const Route = createFileRoute('/components/layout')({
  staticData: { name: 'Layout', icon: 'Grid2', order: 2 },
})
