import { useMemo } from 'react'
import { useRouter, type StaticDataRouteOption } from '@tanstack/react-router'
import type { IconName, NavGroup, NavModule } from './components/Sidebar'

// The single source for both routing AND the menu: every route describes itself via `staticData`.
declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    /** Menu label (like the old IRouteItem `name`). A route with no `name` never appears in the menu. */
    name?: string
    /** Optional menu icon. */
    icon?: IconName
    /** Sort order within the parent (ascending); falls back to alphabetical. */
    order?: number
    /** Routed but hidden from the menu — like the old `showInDrawer: false`. */
    hidden?: boolean
  }
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
 * Builds the sidebar from the route tree — every route describes itself via `staticData`.
 * Page chrome lives on the page's own route file; group/module chrome lives on that folder's
 * `route.tsx`. Nothing in here needs editing to add a page, group, or module.
 */
export function useNavTree(): NavModule[] {
  const router = useRouter()
  return useMemo(() => {
    // 1. Collect every route that opts into the menu (has a `name`).
    const entries: Array<{ path: string; name: string; sd: StaticDataRouteOption }> = []
    for (const route of Object.values(router.looseRoutesById)) {
      const sd = route.options?.staticData
      const path = trimSlashes(route.fullPath)
      if (!sd?.name || !path) continue
      entries.push({ path, name: sd.name, sd })
    }

    const metaByPath = new Map(entries.map((e) => [e.path, e]))
    const paths = entries.map((e) => e.path)
    // A path is a container (module/group) when another menu path nests beneath it.
    const isContainer = (p: string) => paths.some((o) => o !== p && o.startsWith(`${p}/`))

    // Chrome for a container segment: from its own route's staticData, else the prettified segment.
    const chrome = (key: string, seg: string) => {
      const e = metaByPath.get(key)
      return { label: e?.name ?? prettify(seg), icon: e?.sd.icon, order: e?.sd.order ?? Number.POSITIVE_INFINITY }
    }

    const modules = new Map<string, ModuleAcc>()
    const getModule = (seg: string) => {
      let mod = modules.get(seg)
      if (!mod) {
        const c = chrome(seg, seg)
        mod = { label: c.label, icon: c.icon, order: c.order, groups: new Map() }
        modules.set(seg, mod)
      }
      return mod
    }

    // 2. Place every page (non-container, non-hidden) under module → group.
    for (const { path, name, sd } of entries) {
      if (isContainer(path) || sd.hidden) continue
      const segs = path.split('/')
      if (segs.length < 2) continue
      const mod = getModule(segs[0])

      if (segs.length === 2) {
        // Level-2 direct link (no group) — e.g. /components/theme-toggle.
        mod.groups.set(path, {
          label: name,
          icon: sd.icon,
          to: `/${path}`,
          order: sd.order ?? Number.POSITIVE_INFINITY,
          leaves: [],
          isContainer: false,
        })
      } else {
        const groupKey = segs.slice(0, 2).join('/')
        let group = mod.groups.get(groupKey)
        if (!group) {
          const c = chrome(groupKey, segs[1])
          group = { label: c.label, icon: c.icon, order: c.order, leaves: [], isContainer: true }
          mod.groups.set(groupKey, group)
        }
        group.leaves.push({ label: name, to: `/${path}`, icon: sd.icon, order: sd.order ?? Number.POSITIVE_INFINITY })
      }
    }

    // 3. Sort and materialize.
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
