# Techzy Admin (test app)

A test admin panel that consumes the **`sava-test`** (`@techzy/ui`) component library — used to
exercise the library's components, the `RootLayout` shell, and the auto-generated sidebar.

## Stack
- React 19 + TypeScript + Vite
- [TanStack Router](https://tanstack.com/router) (file-based routing)
- UI + shell from `sava-test`

## Scripts
```bash
npm run dev      # start the dev server
npm run build    # type-check (tsc -b) + production build
npm run lint     # eslint
npm run preview  # preview the production build
```

## Adding a page
Pages live under `src/routes/**` and **register themselves in the sidebar** via `staticData` — no
manual menu wiring:

```tsx
export const Route = createFileRoute('/dashboard/')({
  staticData: { name: 'Dashboard', icon: 'Category', order: 0 },
  component: DashboardPage,
})
```

The shell (`RootLayout`), the sidebar, and the `/` → first-page redirect (`FirstRouteRedirect`) all
come from `sava-test`. See `CONSUMER.md` for the full library usage guide.
