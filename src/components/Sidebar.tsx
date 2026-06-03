import { useMemo, useState, type ComponentProps } from 'react'
import {
  Link,
  useRouter,
  useRouterState,
  type LinkProps,
  type StaticDataRouteOption,
} from '@tanstack/react-router'
import { Icon } from 'sava-test'

export type IconName = ComponentProps<typeof Icon>['name']

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

// ── Nav model (the shape the menu renders) ──────────────────────────────
export interface NavLeaf {
  label: string
  to: string
  icon?: IconName
}
export interface NavGroup {
  label: string
  icon?: IconName
  to?: string
  children?: NavLeaf[]
}
export interface NavModule {
  module: string
  icon?: IconName
  groups: NavGroup[]
}

// `to` values are derived from the route tree (plain strings, but valid route paths).
const linkTo = (to: string) => to as LinkProps['to']

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
 * Derives the menu tree by walking the route tree and reading each route's `staticData`.
 * Page chrome lives on the page's own route file; group/module chrome lives on that folder's
 * `route.tsx`. Generic engine — never edited to add a page, group, or module.
 */
function useNavTree(): NavModule[] {
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

/**
 * Self-contained 3-level sidebar (module → group → page). Derives its menu from the
 * route tree and renders it; owns collapse + active state. Drop it in — no props, no config.
 * Designed to be lifted into the component library as one unit.
 */
export function Sidebar() {
  const tree = useNavTree()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  return (
    <nav className="nav">
      {tree.map((mod) => (
        <div className="nav-module" key={mod.module}>
          <div className="nav-module__label">
            {mod.icon ? <Icon name={mod.icon} size="sm" /> : null}
            {mod.module}
          </div>
          {mod.groups.map((group) => (
            <NavGroupItem key={group.label} group={group} pathname={pathname} />
          ))}
        </div>
      ))}
    </nav>
  )
}

function groupIsActive(group: NavGroup, pathname: string): boolean {
  if (group.to && pathname === group.to) return true
  return group.children?.some((leaf) => leaf.to === pathname) ?? false
}

function NavGroupItem({ group, pathname }: { group: NavGroup; pathname: string }) {
  const active = groupIsActive(group, pathname)
  const hasChildren = !!group.children?.length
  const [open, setOpen] = useState(active)

  const label = (
    <>
      <GroupIcon icon={group.icon} />
      <span className="nav-row__label">{group.label}</span>
    </>
  )

  // Case A — link only (no children): a standalone level-2 page.
  if (!hasChildren && group.to) {
    return (
      <Link to={linkTo(group.to)} className="nav-row" data-active={active ? 'true' : undefined}>
        {label}
      </Link>
    )
  }

  // Case B — collapsible + own page: label navigates, separate chevron toggles.
  const header =
    hasChildren && group.to ? (
      <div className="nav-combo" data-active={active ? 'true' : undefined}>
        <Link to={linkTo(group.to)} className="nav-row" data-active={active ? 'true' : undefined}>
          {label}
        </Link>
        <button
          type="button"
          className="nav-chevron-btn"
          aria-label={`${open ? 'Collapse' : 'Expand'} ${group.label}`}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name="ArrowDown2" size="sm" className="nav-chevron" data-open={open ? 'true' : 'false'} />
        </button>
      </div>
    ) : (
      // Case C — pure group: the whole row toggles.
      <button
        type="button"
        className="nav-row"
        data-active={active ? 'true' : undefined}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        <Icon name="ArrowDown2" size="sm" className="nav-chevron" data-open={open ? 'true' : 'false'} />
      </button>
    )

  return (
    <div>
      {header}
      {hasChildren && open ? (
        <div className="nav-leaves">
          {group.children?.map((leaf) => (
            <Link key={leaf.to} to={linkTo(leaf.to)} className="nav-leaf">
              {leaf.icon ? <Icon name={leaf.icon} size="sm" /> : <span className="nav-leaf__dot" />}
              {leaf.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function GroupIcon({ icon }: { icon?: IconName }) {
  if (!icon) return null
  return (
    <span className="nav-icon">
      <Icon name={icon} size="sm" />
    </span>
  )
}
