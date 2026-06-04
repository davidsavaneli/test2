import { createFileRoute } from '@tanstack/react-router'
import type { ComponentProps } from 'react'
import { Icon, Typography } from 'sava-test'
import { Page } from '../../components/Page'

// Top-level page — lives outside the Components / Hooks modules.
export const Route = createFileRoute('/dashboard/')({
  staticData: { name: 'Dashboard', icon: 'Category', order: 0 },
  component: DashboardPage,
})

const STATS = [
  { label: 'Total Users', value: '1,248', icon: 'People', color: 'primary' },
  { label: 'Revenue', value: '$32,910', icon: 'Wallet3', color: 'success' },
  { label: 'Orders', value: '864', icon: 'ShoppingCart', color: 'info' },
] as const satisfies ReadonlyArray<{
  label: string
  value: string
  icon: ComponentProps<typeof Icon>['name']
  color: ComponentProps<typeof Icon>['color']
}>

function DashboardPage() {
  return (
    <Page title="Dashboard" description="Overview of your test admin panel.">
      <div className="stat-grid">
        {STATS.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <span className="stat-card__icon">
              <Icon name={stat.icon} color={stat.color} size="lg" />
            </span>
            <Typography variant="h3">{stat.value}</Typography>
            <Typography variant="bodySmall" color="tertiary">
              {stat.label}
            </Typography>
          </div>
        ))}
      </div>
    </Page>
  )
}
