import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Suspense, lazy } from 'react'
import { Icon, ThemeToggle, Typography } from 'sava-test'
import { Sidebar } from '../components/Sidebar'
import { useNavTree } from '../nav'

// Devtools are dev-only and code-split out of the production bundle.
const RouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/react-router-devtools').then((m) => ({
        default: m.TanStackRouterDevtools,
      })),
    )

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const navTree = useNavTree()
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <Icon name="Box" color="primary" size="lg" />
          <Typography variant="h4">Techzy Admin</Typography>
        </div>
        <Sidebar tree={navTree} />
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <Typography variant="subtitle" color="tertiary">
            Test Admin Panel
          </Typography>
          <ThemeToggle />
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>

      <Suspense>
        <RouterDevtools />
      </Suspense>
    </div>
  )
}
