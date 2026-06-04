import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Suspense, lazy } from 'react'
import { Icon, RootLayout, ThemeToggle, Typography } from 'sava-test'

// Devtools are dev-only and code-split out of the production bundle.
const RouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/react-router-devtools').then((m) => ({
        default: m.TanStackRouterDevtools,
      })),
    )

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <RootLayout
        brand={
          <>
            <Icon name="Box" color="primary" size="lg" />
            <Typography variant="h4">Techzy Admin</Typography>
          </>
        }
        headerStart={
          <Typography variant="subtitle" color="tertiary">
            Test Admin Panel
          </Typography>
        }
        headerEnd={<ThemeToggle />}
      >
        <Outlet />
      </RootLayout>
      <Suspense>
        <RouterDevtools />
      </Suspense>
    </>
  )
}
