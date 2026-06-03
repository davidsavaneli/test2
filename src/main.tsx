import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import 'sava-test/reset.css'
import 'sava-test/styles.css'
import './styles/layout.css'
import { ThemeProvider } from 'sava-test'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

// Type-safe routing: register the router instance with TanStack Router.
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const theme = {
  mode: 'light' as const,
  colors: {
    light: { primary: '#13404e', secondary: '#f4f9f8', tertiary: '#5c7687', dark: '#056472',
      medium: '#039aa1', light: '#adc3c9', success: '#00a854', error: '#f04134', info: '#039aa1', warning: '#ffbf00' },
    dark: { secondary: '#04202b' },
  },
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider config={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
