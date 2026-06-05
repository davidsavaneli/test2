import {
  Outlet,
  createRootRoute,
  redirect,
  useNavigate,
  useRouterState,
} from '@tanstack/react-router'
import { Suspense, lazy } from 'react'
import { Icon, RootLayout, Typography } from 'sava-test/components'
import { hasAccess } from 'sava-test/helpers'
import { auth } from '../auth'

// Devtools are dev-only and code-split out of the production bundle.
const RouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/react-router-devtools').then((m) => ({
        default: m.TanStackRouterDevtools,
      })),
    )

export const Route = createRootRoute({
  // One central guard for the whole app — pages only declare `staticData.roles`.
  beforeLoad: ({ location, matches }) => {
    // Auth: block every route except /login until signed in.
    if (!auth.isAuthed() && location.pathname !== '/login') {
      throw redirect({ to: '/login' })
    }
    // Roles: if any matched route requires roles the user lacks → first allowed page.
    if (matches.some((m) => !hasAccess(m.staticData?.roles))) {
      throw redirect({ to: '/' })
    }
  },
  component: RootComponent,
})

function RootComponent() {
  const isLogin = useRouterState({
    select: (s) => s.location.pathname === '/login',
  })
  const navigate = useNavigate()

  // The login page renders bare — no sidebar/header shell.
  if (isLogin) return <Outlet />

  return (
    <>
      <RootLayout
        logo={
          <>
            <Icon name="Box" color="primary" size="lg" />
            <Typography variant="h4">Techzy Admin</Typography>
          </>
        }
        header={{
          theme: true,
          onLogout: () => {
            auth.logout()
            navigate({ to: '/login' })
          },
        }}
      >
        <Outlet />
      </RootLayout>
      <Suspense>
        <RouterDevtools />
      </Suspense>
    </>
  )
}
