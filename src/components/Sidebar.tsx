import { useState, type ComponentProps } from 'react'
import { Link, useRouterState, type LinkProps } from '@tanstack/react-router'
import { Icon } from 'sava-test'

export type IconName = ComponentProps<typeof Icon>['name']

/** Level 3 — a page link. */
export interface NavLeaf {
  label: string
  to: string
  icon?: IconName
}

/** Level 2 — a group. Collapsible when it has `children`; a link when it has `to`; both is allowed. */
export interface NavGroup {
  label: string
  icon?: IconName
  to?: string
  children?: NavLeaf[]
}

/** Level 1 — a module. A non-clickable section header over its groups. */
export interface NavModule {
  module: string
  icon?: IconName
  groups: NavGroup[]
}

// `to` values are built dynamically from the route tree, so they're plain strings here;
// they're guaranteed-valid route paths by construction. This narrows them for <Link>.
const linkTo = (to: string) => to as LinkProps['to']

/**
 * Presentational 3-level sidebar (module → group → page). Pure UI — it renders
 * whatever `tree` it's handed and owns only collapse + active state. Built to be
 * lifted into the component library: hand it a nav object, it draws the menu.
 */
export function Sidebar({ tree }: { tree: NavModule[] }) {
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
