import { useMemo } from 'react'
import { useRouter } from '@tanstack/react-router'
import type { IconName, NavGroup, NavModule } from './components/Sidebar'

// Make `staticData` on routes carry the menu metadata, typed.
declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    /** Menu label for this page. A route with no `title` is omitted from the sidebar. */
    title?: string
    /** Optional leaf icon (otherwise a bullet is shown). */
    icon?: IconName
    /** Sort order within the parent group (ascending). Falls back to alphabetical. */
    order?: number
  }
}

/**
 * Display metadata for CONTAINER segments (modules + groups) — the parts of the menu
 * that aren't themselves pages, so they have nowhere to put `staticData`. Keyed by the
 * path prefix. Everything here is optional: a missing label is auto-prettified from the
 * segment ("forms" → "Forms"). Pages need NO entry here — they self-describe.
 */
const SECTIONS: Record<string, { label?: string; icon?: IconName; order?: number }> = {
  components: { label: 'Components', order: 0 },
  'components/forms': { label: 'Forms', icon: 'DocumentText', order: 0 },
  'components/display': { label: 'Display', icon: 'Gallery', order: 1 },
}

const prettify = (seg: string) =>
  seg
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

const trimSlashes = (p: string) => p.replace(/^\/+|\/+$/g, '')

const byOrderThenLabel = (a: { order: number; label: string }, b: { order: number; label: string }) =>
  a.order - b.order || a.label.localeCompare(b.label)

interface LeafAcc {
  label: string
  to: string
  icon?: IconName
  order: number
}
interface GroupAcc {
  label: string
  icon?: IconName
  to?: string
  order: number
  leaves: LeafAcc[]
  isContainer: boolean
}
interface ModuleAcc {
  label: string
  icon?: IconName
  order: number
  groups: Map<string, GroupAcc>
}

/**
 * Builds the sidebar tree by walking every route and reading its `staticData`.
 * The URL and grouping come from the route's own path — add a route file with a
 * `title` in `staticData` and it appears in the menu automatically.
 */
export function useNavTree(): NavModule[] {
  const router = useRouter()
  return useMemo(() => {
    const modules = new Map<string, ModuleAcc>()

    for (const route of Object.values(router.looseRoutesById)) {
      const sd = route.options?.staticData
      if (!sd?.title) continue

      const path = trimSlashes(route.fullPath)
      const segs = path ? path.split('/') : []
      if (segs.length < 2) continue // only namespaced pages (e.g. /components/...)

      const moduleKey = segs[0]
      let mod = modules.get(moduleKey)
      if (!mod) {
        const meta = SECTIONS[moduleKey] ?? {}
        mod = {
          label: meta.label ?? prettify(moduleKey),
          icon: meta.icon,
          order: meta.order ?? Number.POSITIVE_INFINITY,
          groups: new Map(),
        }
        modules.set(moduleKey, mod)
      }

      if (segs.length === 2) {
        // Module-level direct link (level 2, no group) — e.g. /components/theme-toggle.
        mod.groups.set(path, {
          label: sd.title,
          icon: sd.icon,
          to: `/${path}`,
          order: sd.order ?? Number.POSITIVE_INFINITY,
          leaves: [],
          isContainer: false,
        })
      } else {
        // Page under a group — e.g. /components/forms/button.
        const groupKey = segs.slice(0, 2).join('/')
        let group = mod.groups.get(groupKey)
        if (!group) {
          const meta = SECTIONS[groupKey] ?? {}
          group = {
            label: meta.label ?? prettify(segs[1]),
            icon: meta.icon,
            order: meta.order ?? Number.POSITIVE_INFINITY,
            leaves: [],
            isContainer: true,
          }
          mod.groups.set(groupKey, group)
        }
        group.leaves.push({
          label: sd.title,
          to: `/${path}`,
          icon: sd.icon,
          order: sd.order ?? Number.POSITIVE_INFINITY,
        })
      }
    }

    return [...modules.values()].sort(byOrderThenLabel).map(
      (mod): NavModule => ({
        module: mod.label,
        icon: mod.icon,
        groups: [...mod.groups.values()].sort(byOrderThenLabel).map(
          (g): NavGroup => ({
            label: g.label,
            icon: g.icon,
            to: g.to,
            children: g.isContainer
              ? g.leaves.sort(byOrderThenLabel).map((l) => ({ label: l.label, to: l.to, icon: l.icon }))
              : undefined,
          }),
        ),
      }),
    )
  }, [router])
}
