import { createFileRoute, redirect } from '@tanstack/react-router'

// No landing page yet — send the root to the first component page.
export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/components/forms/button' })
  },
})
