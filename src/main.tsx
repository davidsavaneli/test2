import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import 'sava-test/css/reset.css'
import 'sava-test/css/styles.css'
import { ThemeProvider } from 'sava-test/theme'
import { routeTree } from './routeTree.gen'
import { auth } from './auth'

const router = createRouter({ routeTree })

// Type-safe routing: register the router instance with TanStack Router.
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const theme = {
  mode: 'light' as const,
}

auth.restore() // re-publish stored roles before the router mounts

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider config={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
